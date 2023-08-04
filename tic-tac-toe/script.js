const domHelper = (function() {
    /**
     * Attach the provided event handler to all nodes in the given NodeList.
     * @param {NodeList} list NodeList of nodes to add event handler to
     * @param {string} event Event
     * @param {Function} func Event handler
     */
    function addEventListenerList(list, event, func) {
        for(let node of list) {
            node.addEventListener(event, func);
        }
    };
    function removeEventListenerList(list, event, func) {
        for(let node of list) {
            node.removeEventListener(event, func);
        }
    }
    return {
        addEventListenerList,
        removeEventListenerList
    };
})();

const gameBoard = (function() {
    // Initialize empty board represented by 9 spaces for 3x3 grid
    const _board = Array(9).fill(null);
    const getBoard = () => _board;
    const clearBoard = () => _board.fill(null);
    const addMark = function(mark, location) {
        let success = false;
        // Only add mark if the location is not already filled
        if(!_board[location]) {
            _board[location] = mark;
            success = true;
        }
        return success;
    }
    return {
        getBoard,
        clearBoard,
        addMark
    };
})();

function createPlayer(name, isPlayer1) {
    const mark = isPlayer1 ? 'x' : 'o';
    return {
        name,
        isPlayer1,
        mark,
    };
}

const gameController = (function(gameBoard, htmlNodes, menuNode, messageNode, resetNode) {
    const _startBtn = menuNode.querySelector('button');
    const [_p1Input, _p2Input] = [menuNode.querySelector('#player1'), menuNode.querySelector('#player2')];

    let _inPlay = false;
    let _currentPlayer = null;
    let [_player1, _player2] = [null, null];

    /**
     * Display currently marked spaces on the game board
     */
    const _showBoard = function() {
        for(let [i, mark] of gameBoard.getBoard().entries()) {
            if(mark) {
                htmlNodes[i].textContent = mark;
            } else {
                htmlNodes[i].textContent = '';
            }
        }
    };

    /**
     * Switch the current player
     */
    const switchPlayer = function() {
        _currentPlayer = _currentPlayer.isPlayer1 ? _player2 : _player1;
        _showCurrentPlayer();
    };

    /**
     * Check if line has three in a row
     * @param {array} line 
     * @returns
     */
    const hasThreeInARow = function(line) {
        const firstMark = line[0];
        for(let i = 0; i < line.length; i++) {
            if(!line[i] || (line[i] !== firstMark)) {
                return false; 
            }
        }
        return true;
    };

    /**
     * Check for when the game is over
     */
    const checkGameStatus = function() {
        const board = gameBoard.getBoard();
        const lines = [];
        // Get rows
        for(let i = 0; i < board.length; i += 3) {
            let row = board.slice(i, i+3);
            lines.push(row);
        }
        // Get columns
        for(let j = 0; j < 3; j++) {
            let col = board.filter((_,idx) => idx % 3 === j);
            lines.push(col);
        }
        // Get diagonals
        const diag1 = [0, 4, 8].map(idx => board[idx]);
        const diag2 = [2, 4, 6].map(idx => board[idx]);
        lines.push(diag1, diag2);

        for(let line of lines) {
            if(hasThreeInARow(line)) {
                return 'won';
            }
        }
        // The board is full
        if(board.every(mark => mark)) {
            return 'tie';
        }
        return 'continue';
    };

    const _resetGame = function() {
        _inPlay = false;
        _currentPlayer = null;
        [_player1, _player2] = [null, null];
        gameBoard.clearBoard();
        domHelper.removeEventListenerList(htmlNodes, 'click', _playRound);
    };

    const _restartGame = function() {
        _resetGame();
        showMenu();
        resetNode.removeEventListener('click', _restartGame);
    };

    /**
     * Declare winner
     * 
     * @param {String} status 
     */
    const _endGame = function(status) {
        if(status === 'won') {
            const winner = _currentPlayer.name;
            _updateGameMsg(`${winner} won!`);
        } else {
            _updateGameMsg('Tie');
        }
        _resetGame();
    };

    const _playRound = function() {
        if(!_inPlay) {
            return;
        }
        const mark = _currentPlayer.mark;
        const markAdded = gameBoard.addMark(mark, this.dataset.idx);
        if(markAdded) {
            _showBoard();
            const status = checkGameStatus();
            if(status === 'tie' || status === 'won') {
                _endGame(status);
            } else {
                switchPlayer();
            }
        }
    };

    /**
     * Get name from name entry or use default name
     * 
     * @param {htmlNode} input Input node for getting player name
     * @param {boolean} isPlayer1 
     * @returns 
     */
    const _getNameInput = function(input, isPlayer1) {
        let name = input.value;
        if(input.value === '') {
            name = isPlayer1 ? 'Player 1' : 'Player 2';
        }
        return name;
    };

    const _updateGameMsg = function(message) {
        messageNode.textContent = message;
    };
    
    const _showCurrentPlayer = function() {
        _updateGameMsg(`${_currentPlayer.name}'s turn (${_currentPlayer.mark})`);
    }

    const _play = function() {
        // Get names and hide starter menu
        const [p1Name, p2Name] = [_getNameInput(_p1Input, true), _getNameInput(_p2Input, false)];
        menuNode.classList.add('hidden');
        _startBtn.removeEventListener('click', _play);

        // Initialize game
        _showBoard();
        _inPlay = true;
        _player1 = createPlayer(p1Name, true);
        _player2 = createPlayer(p2Name, false);
        _currentPlayer = _player1;
        _showCurrentPlayer();
        domHelper.addEventListenerList(htmlNodes, 'click', _playRound);

        // Enable reset button
        resetNode.addEventListener('click', _restartGame);
    };

    const showMenu = function() {
        menuNode.classList.remove('hidden');
        _startBtn.addEventListener('click', _play);
    }

    return {
        showMenu
    };
})(gameBoard, 
    document.querySelectorAll('.square'), 
    document.querySelector('.game-starter'),
    document.querySelector('.game-message'),
    document.querySelector('#reset-btn')
    );

gameController.showMenu();