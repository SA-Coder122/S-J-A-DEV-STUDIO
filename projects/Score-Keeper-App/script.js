class ScoreKeeper {
    constructor() {
        this.players = [];
        this.history = [];
        this.settings = {
            maxScore: 50,
            foulLimit: 5,
            soundEnabled: true,
            theme: 'light',
            timerMode: 'countdown'
        };
        this.timer = {
            totalSeconds: 0,
            isRunning: false,
            interval: null
        };
        
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.updateDisplay();
        this.registerServiceWorker();
        
        // Set initial theme
        document.documentElement.setAttribute('data-theme', this.settings.theme);
        this.updateThemeIcon();
    }

    bindEvents() {
        // Settings
        document.getElementById('settingsBtn').addEventListener('click', () => this.toggleSettings());
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('soundToggle').addEventListener('change', (e) => {
            this.settings.soundEnabled = e.target.checked;
            this.saveToStorage();
        });

        // Player management
        document.getElementById('addPlayerBtn').addEventListener('click', () => this.showAddPlayerModal());
        document.getElementById('addFirstPlayer').addEventListener('click', () => this.showAddPlayerModal());
        document.getElementById('confirmAdd').addEventListener('click', () => this.addPlayer());
        document.getElementById('cancelAdd').addEventListener('click', () => this.hideAddPlayerModal());
        document.getElementById('closeModal').addEventListener('click', () => this.hideAddPlayerModal());
        document.getElementById('playerNameInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addPlayer();
        });

        // Settings inputs
        document.getElementById('maxScore').addEventListener('change', (e) => {
            this.settings.maxScore = parseInt(e.target.value);
            this.saveToStorage();
        });
        document.getElementById('foulLimit').addEventListener('change', (e) => {
            this.settings.foulLimit = parseInt(e.target.value);
            this.saveToStorage();
        });

        // Timer
        document.getElementById('startTimer').addEventListener('click', () => this.startTimer());
        document.getElementById('pauseTimer').addEventListener('click', () => this.pauseTimer());
        document.getElementById('resetTimer').addEventListener('click', () => this.resetTimer());
        
        // Timer mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setTimerMode(e.target.dataset.mode));
        });

        // Actions
        document.getElementById('resetBtn').addEventListener('click', () => this.resetAll());
        document.getElementById('undoBtn').addEventListener('click', () => this.undoLastAction());

        // Color picker
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });

        // Modal backdrops
        document.getElementById('addPlayerModal').addEventListener('click', (e) => {
            if (e.target.id === 'addPlayerModal') this.hideAddPlayerModal();
        });
    }

    // Player Management
    showAddPlayerModal() {
        document.getElementById('addPlayerModal').classList.add('show');
        document.getElementById('playerNameInput').value = '';
        document.getElementById('playerNameInput').focus();
    }

    hideAddPlayerModal() {
        document.getElementById('addPlayerModal').classList.remove('show');
    }

    addPlayer() {
        const nameInput = document.getElementById('playerNameInput');
        const name = nameInput.value.trim();
        const colorOption = document.querySelector('.color-option.selected');
        const color = colorOption ? colorOption.dataset.color : '#3b82f6';

        if (!name) {
            this.showToast('Please enter a player name', 'error');
            return;
        }

        if (this.players.some(player => player.name.toLowerCase() === name.toLowerCase())) {
            this.showToast('Player name already exists', 'error');
            return;
        }

        const newPlayer = {
            id: Date.now().toString(),
            name: name,
            score: 0,
            fouls: 0,
            color: color
        };

        this.saveToHistory('addPlayer', newPlayer);
        this.players.push(newPlayer);
        this.saveToStorage();
        this.updateDisplay();
        this.hideAddPlayerModal();
        
        this.showToast(`Player "${name}" added successfully`, 'success');
    }

    removePlayer(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;

        this.saveToHistory('removePlayer', player);
        this.players = this.players.filter(p => p.id !== playerId);
        this.saveToStorage();
        this.updateDisplay();
        
        this.showToast(`Player "${player.name}" removed`, 'warning');
    }

    updateScore(playerId, delta) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;

        const oldScore = player.score;
        player.score = Math.max(0, player.score + delta);
        
        this.saveToHistory('updateScore', { playerId, oldScore, newScore: player.score, delta });
        this.saveToStorage();
        this.updateDisplay();

        // Visual feedback
        const scoreElement = document.querySelector(`[data-player-id="${playerId}"] .player-score`);
        if (scoreElement) {
            scoreElement.classList.add('score-updated');
            setTimeout(() => scoreElement.classList.remove('score-updated'), 600);
        }

        // Check for winner
        if (player.score >= this.settings.maxScore) {
            this.declareWinner(player);
        }
    }

    updateFoul(playerId, delta = 1) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;

        const oldFouls = player.fouls;
        player.fouls = Math.max(0, player.fouls + delta);
        
        this.saveToHistory('updateFoul', { playerId, oldFouls, newFouls: player.fouls, delta });
        this.saveToStorage();
        this.updateDisplay();

        // Check foul limit
        if (player.fouls >= this.settings.foulLimit) {
            this.handleFoulLimit(player);
        }
    }

    handleFoulLimit(player) {
        this.showToast(`⚠️ ${player.name} has reached the foul limit!`, 'warning');
    }

    declareWinner(player) {
        this.showToast(`🎉 ${player.name} wins the game!`, 'success');
    }

    renamePlayer(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;

        const newName = prompt('Enter new name for player:', player.name);
        if (newName && newName.trim() && newName.trim() !== player.name) {
            const oldName = player.name;
            player.name = newName.trim();
            this.saveToStorage();
            this.updateDisplay();
            this.showToast(`Player renamed from "${oldName}" to "${player.name}"`, 'success');
        }
    }

    // Timer Functions
    setTimerMode(mode) {
        this.settings.timerMode = mode;
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        this.resetTimer();
        this.saveToStorage();
    }

    startTimer() {
        if (this.timer.isRunning) return;

        this.timer.isRunning = true;
        this.timer.interval = setInterval(() => {
            if (this.settings.timerMode === 'countdown') {
                this.timer.totalSeconds--;
                if (this.timer.totalSeconds <= 0) {
                    this.timer.totalSeconds = 0;
                    this.timerFinished();
                }
            } else {
                this.timer.totalSeconds++;
            }
            this.updateTimerDisplay();
        }, 1000);

        this.updateTimerControls();
    }

    pauseTimer() {
        if (!this.timer.isRunning) return;

        this.timer.isRunning = false;
        clearInterval(this.timer.interval);
        this.updateTimerControls();
    }

    resetTimer() {
        this.timer.isRunning = false;
        clearInterval(this.timer.interval);
        this.timer.totalSeconds = 0;
        this.updateTimerDisplay();
        this.updateTimerControls();
    }

    timerFinished() {
        this.pauseTimer();
        this.showToast('⏰ Time is up!', 'warning');
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timer.totalSeconds / 60);
        const seconds = this.timer.totalSeconds % 60;
        document.getElementById('timerDisplay').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateTimerControls() {
        const startBtn = document.getElementById('startTimer');
        const pauseBtn = document.getElementById('pauseTimer');
        
        if (this.timer.isRunning) {
            startBtn.disabled = true;
            pauseBtn.disabled = false;
        } else {
            startBtn.disabled = false;
            pauseBtn.disabled = this.timer.totalSeconds === 0;
        }
    }

    // Settings
    toggleSettings() {
        document.getElementById('settingsPanel').classList.toggle('show');
    }

    toggleTheme() {
        const newTheme = this.settings.theme === 'light' ? 'dark' : 'light';
        this.settings.theme = newTheme;
        document.documentElement.setAttribute('data-theme', newTheme);
        this.updateThemeIcon();
        this.saveToStorage();
        this.showToast(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode enabled`, 'success');
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = this.settings.theme === 'light' ? '🌙' : '☀️';
    }

    // History Management
    saveToHistory(action, data) {
        this.history.unshift({
            action,
            data,
            timestamp: new Date().toISOString(),
            snapshot: JSON.parse(JSON.stringify(this.players))
        });

        if (this.history.length > 50) {
            this.history.pop();
        }

        this.updateUndoButton();
    }

    undoLastAction() {
        if (this.history.length === 0) return;

        const lastAction = this.history.shift();
        this.players = lastAction.snapshot;
        this.saveToStorage();
        this.updateDisplay();
        this.updateUndoButton();
        this.showToast('Last action undone', 'success');
    }

    updateUndoButton() {
        document.getElementById('undoBtn').disabled = this.history.length === 0;
    }

    // Data Management
    resetAll() {
        if (!confirm('Are you sure you want to reset all scores and fouls?')) return;

        this.saveToHistory('resetAll', {
            players: JSON.parse(JSON.stringify(this.players))
        });

        this.players.forEach(player => {
            player.score = 0;
            player.fouls = 0;
        });

        this.saveToStorage();
        this.updateDisplay();
        this.showToast('All scores and fouls reset', 'success');
    }

    // Display
    updateDisplay() {
        this.renderPlayers();
        this.updateStats();
        this.updateUndoButton();
    }

    renderPlayers() {
        const container = document.getElementById('playersContainer');
        const emptyState = document.getElementById('emptyState');

        if (this.players.length === 0) {
            emptyState.style.display = 'block';
            container.innerHTML = '';
            return;
        }

        emptyState.style.display = 'none';

        // Sort by score
        const sortedPlayers = [...this.players].sort((a, b) => b.score - a.score);
        const highestScore = sortedPlayers[0]?.score;

        container.innerHTML = sortedPlayers.map((player) => {
            const isLeader = player.score === highestScore && highestScore > 0;
            const foulWarning = player.fouls >= this.settings.foulLimit - 1;
            
            return `
                <div class="player-card ${isLeader ? 'leader' : ''} ${foulWarning ? 'foul-warning' : ''}" 
                     data-player-id="${player.id}" style="border-left-color: ${player.color}">
                    
                    <div class="player-fouls" style="background-color: ${player.color}">
                        ${player.fouls}
                    </div>
                    
                    <div class="player-header">
                        <h3 class="player-name" style="color: ${player.color}">
                            ${this.escapeHtml(player.name)}
                            ${isLeader ? ' 🏆' : ''}
                        </h3>
                        <div class="player-actions">
                            <button class="btn-small" onclick="app.renamePlayer('${player.id}')" title="Rename">
                                ✏️
                            </button>
                            <button class="btn-small" onclick="app.removePlayer('${player.id}')" title="Remove">
                                🗑️
                            </button>
                        </div>
                    </div>
                    
                    <div class="player-score">${player.score}</div>
                    
                    <div class="score-controls">
                        <button class="btn-score decrement" onclick="app.updateScore('${player.id}', -1)">
                            <span>-1</span>
                        </button>
                        <button class="btn-score increment" onclick="app.updateScore('${player.id}', 1)">
                            <span>+1</span>
                        </button>
                        <button class="btn-score decrement" onclick="app.updateScore('${player.id}', -5)">
                            <span>-5</span>
                        </button>
                        <button class="btn-score increment" onclick="app.updateScore('${player.id}', 5)">
                            <span>+5</span>
                        </button>
                    </div>
                    
                    <div class="foul-controls">
                        <button class="btn-foul remove" onclick="app.updateFoul('${player.id}', -1)" ${player.fouls === 0 ? 'disabled' : ''}>
                            <span>➖</span> Foul
                        </button>
                        <button class="btn-foul" onclick="app.updateFoul('${player.id}', 1)">
                            <span>➕</span> Foul
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateStats() {
        document.getElementById('playerCount').textContent = this.players.length;
        
        const totalPoints = this.players.reduce((sum, player) => sum + player.score, 0);
        document.getElementById('totalPoints').textContent = totalPoints;

        const totalFouls = this.players.reduce((sum, player) => sum + player.fouls, 0);
        document.getElementById('totalFouls').textContent = totalFouls;
        
        const leader = this.players.length > 0 
            ? [...this.players].sort((a, b) => b.score - a.score)[0]
            : null;
        
        document.getElementById('leaderName').textContent = leader && leader.score > 0 
            ? leader.name 
            : '-';
    }

    // Storage
    saveToStorage() {
        const data = {
            players: this.players,
            history: this.history.slice(0, 10),
            settings: this.settings,
            timer: this.timer
        };
        localStorage.setItem('scoreKeeper-data', JSON.stringify(data));
    }

    loadFromStorage() {
        try {
            const saved = localStorage.getItem('scoreKeeper-data');
            if (saved) {
                const data = JSON.parse(saved);
                this.players = data.players || [];
                this.history = data.history || [];
                this.settings = { ...this.settings, ...(data.settings || {}) };
                this.timer = { ...this.timer, ...(data.timer || {}) };
                
                // Update UI elements
                document.getElementById('maxScore').value = this.settings.maxScore;
                document.getElementById('foulLimit').value = this.settings.foulLimit;
                document.getElementById('soundToggle').checked = this.settings.soundEnabled;
                
                this.updateTimerDisplay();
                this.updateTimerControls();
            }
        } catch (error) {
            console.error('Error loading from storage:', error);
        }
    }

    // Utility Methods
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Service Worker
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('./service-worker.js');
                console.log('Service Worker registered');
            } catch (error) {
                console.log('Service Worker registration failed:', error);
            }
        }
    }
}

// Initialize the app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ScoreKeeper();
});