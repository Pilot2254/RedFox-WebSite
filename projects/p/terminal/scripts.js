const outputDiv = document.getElementById('output');
const inputField = document.getElementById('input');
const log = [];
let commandHistory = [];
let bookmarks = {};
let historyIndex = -1;
let isAwaitingInput = false;
let scheduledCommands = [];

const commands = {
    help: `Available commands:
    
System:
- help: Show this help message.
- about: About RedFox Studios Terminal.
- cls: Clear the terminal.
- fontsize [size]: Change terminal font size.
- systeminfo: Display system information.
- refresh: Refresh the terminal page.
- clearcache: Clear the browser's local storage and cookies.
- exit: Close the terminal page.
- closealltabs: Attempt to close all open tabs.

Navigation:
- back: Navigate to the previous page in browser history.
- forward: Navigate to the next page in browser history.
- open [url]: Open a website.
- new: Open a new browser window with the RedFox Studios terminal.
- search [query]: Open a Google search for the provided query.

Text and Data:
- echo [message]: Display a message in the terminal.
- reverse [text]: Reverse the provided text.
- length [text]: Get the length of the provided text.
- binary [number]: Convert a number to its binary representation.
- hex [number]: Convert a number to its hexadecimal representation.
- octal [number]: Convert a number to its octal representation.
- copy [text]: Copy the provided text to the clipboard.
- paste: Paste the current content of the clipboard.
- calc [expression]: Evaluate a mathematical expression.

Utilities:
- alert [text]: Display an alert message.
- console [text]: Send a message to the browser's console.
- bookmark [name] [url]: Save a URL under a specified name.
- openbookmark [name]: Open a saved bookmark by name.
- random [min] [max]: Generate a random number between min and max.
- ping [url]: Simulate a network ping to a given URL.
- fullscreen: Toggle full-screen mode.
- exitfullscreen: Exit full-screen mode.
- history: Display the history of entered commands.
- schedule [time] [repeat] [command]: Schedule a command to run after a specified time with a repeat interval (e.g., schedule 5s 10s echo "Hello").
- log: Download the command log as a file.`,
    about: 'RedFox Studios Terminal - A simple web-based terminal emulator.',
};

function displayOutput(text, isError = false) {
    const newLine = document.createElement('div');
    newLine.textContent = text;
    if (isError) {
        newLine.style.color = 'red';
    }
    outputDiv.appendChild(newLine);
    outputDiv.scrollTop = outputDiv.scrollHeight;
    logCommand(`> ${text}`, isError);
}

function logCommand(command, isError = false) {
    log.push({ command, isError });
}

function clearConsole() {
    outputDiv.innerHTML = '';
}

function handleCommand(command) {
    const args = command.split(' ');
    const cmd = args[0].toLowerCase();
    const restOfCommand = args.slice(1).join(' ');

    if (isAwaitingInput) {
        handleInteractiveInput(cmd);
        return;
    }

    // Add command to history
    if (command.trim()) {
        commandHistory.push(command.trim());
        historyIndex = commandHistory.length; // Reset history index to the end
    }

    switch (cmd) {
        case 'help':
            displayOutput(commands.help);
            break;
        case 'about':
            displayOutput(commands.about);
            break;
        case 'fontsize':
            if (args.length === 2 && !isNaN(args[1])) {
                document.getElementById('terminal').style.fontSize = `${args[1]}px`;
                inputField.style.fontSize = `${args[1]}px`;
            } else {
                displayError('fontsize', 'fontsize [size in px]', 'Invalid size value. Ensure it is a number.');
            }
            break;
        case 'cls':
            clearConsole();
            break;
        case 'echo':
            if (restOfCommand) {
                displayOutput(restOfCommand);
            } else {
                displayError('echo', 'echo [message]', 'Message text is required.');
            }
            break;
        case 'new':
            window.open('https://www.redfox-studios.org/projects/id/P-001/', '_blank');
            displayOutput('Opened a new browser window with the RedFox Studios terminal.');
            break;
        case 'systeminfo':
            displaySystemInfo();
            break;
        case 'open':
            if (restOfCommand) {
                const url = restOfCommand.startsWith('http') ? restOfCommand : `https://${restOfCommand}`;
                window.open(url, '_blank');
                displayOutput(`Opening ${url}`);
            } else {
                displayError('open', 'open [url]', 'URL is required. Ensure you provide a valid URL.');
            }
            break;
        case 'alert':
            if (restOfCommand) {
                alert(restOfCommand);
                displayOutput('Alert displayed.');
            } else {
                displayError('alert', 'alert [text]', 'Alert text is required.');
            }
            break;
        case 'console':
            if (restOfCommand) {
                console.log(restOfCommand);
                displayOutput('Message sent to the console.');
            } else {
                displayError('console', 'console [text]', 'Console text is required.');
            }
            break;
        case 'refresh':
            location.reload();
            break;
        case 'exit':
            window.close();
            break;
        case 'date':
            displayOutput(new Date().toLocaleDateString());
            break;
        case 'time':
            displayOutput(new Date().toLocaleTimeString());
            break;
        case 'datetime':
            displayOutput(new Date().toLocaleString());
            break;
        case 'calc':
            try {
                const result = eval(restOfCommand);
                displayOutput(`Result: ${result}`);
            } catch (e) {
                displayError('calc', 'calc [expression]', 'Invalid expression. Ensure you use valid operators and operands.');
            }
            break;
        case 'random':
            if (args.length === 3 && !isNaN(args[1]) && !isNaN(args[2])) {
                const min = parseInt(args[1]);
                const max = parseInt(args[2]);
                const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                displayOutput(`Random number between ${min} and ${max}: ${randomNumber}`);
            } else {
                displayError('random', 'random [min] [max]', 'Invalid range. Ensure both min and max are numbers.');
            }
            break;
        case 'reverse':
            if (restOfCommand) {
                displayOutput(restOfCommand.split('').reverse().join(''));
            } else {
                displayError('reverse', 'reverse [text]', 'Text to reverse is required.');
            }
            break;
        case 'length':
            if (restOfCommand) {
                displayOutput(`Length: ${restOfCommand.length}`);
            } else {
                displayError('length', 'length [text]', 'Text to measure is required.');
            }
            break;
        case 'fullscreen':
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                displayOutput('Entered full-screen mode.');
            } else {
                displayOutput('Already in full-screen mode.');
            }
            break;
        case 'exitfullscreen':
            if (document.fullscreenElement) {
                document.exitFullscreen();
                displayOutput('Exited full-screen mode.');
            } else {
                displayOutput('Not in full-screen mode.');
            }
            break;
        case 'clearcache':
            localStorage.clear();
            sessionStorage.clear();
            document.cookie.split(";").forEach(cookie => {
                document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            displayOutput('Cleared browser cache.');
            break;
        case 'history':
            displayOutput('Command history:');
            commandHistory.forEach((cmd, index) => displayOutput(`${index + 1}: ${cmd}`));
            break;
        case 'back':
            history.back();
            break;
        case 'forward':
            history.forward();
            break;
        case 'bookmark':
            if (args.length === 3) {
                bookmarks[args[1]] = args[2];
                displayOutput(`Bookmark saved: ${args[1]} -> ${args[2]}`);
            } else {
                displayError('bookmark', 'bookmark [name] [url]', 'Both bookmark name and URL are required.');
            }
            break;
        case 'openbookmark':
            if (args.length === 2 && bookmarks[args[1]]) {
                window.open(bookmarks[args[1]], '_blank');
                displayOutput(`Opening bookmark: ${args[1]} -> ${bookmarks[args[1]]}`);
            } else {
                displayError('openbookmark', 'openbookmark [name]', 'Bookmark name is required, and it should exist.');
            }
            break;
        case 'binary':
            if (args.length === 2 && !isNaN(args[1])) {
                const number = parseInt(args[1]);
                displayOutput(`Binary of ${number}: ${number.toString(2)}`);
            } else {
                displayError('binary', 'binary [number]', 'A valid number is required.');
            }
            break;
        case 'hex':
            if (args.length === 2 && !isNaN(args[1])) {
                const number = parseInt(args[1]);
                displayOutput(`Hexadecimal of ${number}: ${number.toString(16).toUpperCase()}`);
            } else {
                displayError('hex', 'hex [number]', 'A valid number is required.');
            }
            break;
        case 'octal':
            if (args.length === 2 && !isNaN(args[1])) {
                const number = parseInt(args[1]);
                displayOutput(`Octal of ${number}: ${number.toString(8)}`);
            } else {
                displayError('octal', 'octal [number]', 'A valid number is required.');
            }
            break;
        case 'copy':
            if (restOfCommand) {
                navigator.clipboard.writeText(restOfCommand).then(() => {
                    displayOutput('Text copied to clipboard.');
                }).catch(err => {
                    displayOutput(`Failed to copy text: ${err}`, true);
                });
            } else {
                displayError('copy', 'copy [text]', 'Text to copy is required.');
            }
            break;
        case 'paste':
            navigator.clipboard.readText().then(text => {
                displayOutput(`Pasted from clipboard: ${text}`);
            }).catch(err => {
                displayOutput(`Failed to paste text: ${err}`, true);
            });
            break;
        case 'ping':
            if (restOfCommand) {
                const startTime = Date.now();
                fetch(restOfCommand.startsWith('http') ? restOfCommand : `https://${restOfCommand}`)
                    .then(() => {
                        const latency = Date.now() - startTime;
                        displayOutput(`Ping to ${restOfCommand}: ${latency}ms`);
                    })
                    .catch(() => {
                        displayOutput(`Failed to ping ${restOfCommand}`, true);
                    });
            } else {
                displayError('ping', 'ping [url]', 'A valid URL is required.');
            }
            break;
        case 'search':
            if (restOfCommand) {
                const query = encodeURIComponent(restOfCommand);
                window.open(`https://www.google.com/search?q=${query}`, '_blank');
                displayOutput(`Searching for: ${restOfCommand}`);
            } else {
                displayError('search', 'search [query]', 'A search query is required.');
            }
            break;
        case 'closealltabs':
            displayOutput('Attempting to close all tabs...');
            window.open('', '_self').close(); // This only works if initiated by a user action, and may not work in all browsers.
            break;
        case 'schedule':
            if (args.length === 4) {
                const timeValue = parseInt(args[1]);
                const timeUnit = args[1].slice(-1);
                const repeatValue = parseInt(args[2]);
                const repeatUnit = args[2].slice(-1);
                const validUnits = { 's': 1000, 'm': 60000, 'h': 3600000 };
                const commandToRun = args.slice(3).join(' ');

                if (!isNaN(timeValue) && validUnits[timeUnit] && !isNaN(repeatValue) && validUnits[repeatUnit]) {
                    const delay = timeValue * validUnits[timeUnit];
                    const repeatInterval = repeatValue * validUnits[repeatUnit];

                    scheduledCommands.push(setInterval(() => {
                        displayOutput(`Scheduled Command: ${commandToRun}`);
                        handleCommand(commandToRun);
                    }, repeatInterval));

                    displayOutput(`Scheduled command '${commandToRun}' to run every ${args[2]} after an initial delay of ${args[1]}`);
                } else {
                    displayError('schedule', 'schedule [time] [repeat] [command]', 'Invalid time or repeat format. Use a number followed by s (seconds), m (minutes), or h (hours).');
                }
            } else {
                displayError('schedule', 'schedule [time] [repeat] [command]', 'Time, repeat interval, and command to schedule are required.');
            }
            break;
        case 'log':
            downloadLog();
            break;
        default:
            handleUnknownCommand(cmd);
    }
}

function handleUnknownCommand(command) {
    const possibleCommands = Object.keys(commands);
    const suggestions = possibleCommands.filter(cmd => cmd.startsWith(command)).slice(0, 3);
    let errorMessage = `Unknown command: ${command}`;
    if (suggestions.length > 0) {
        errorMessage += `. Did you mean: ${suggestions.join(', ')}?`;
    }
    displayOutput(errorMessage, true);
    displayOutput("Error: Command not recognized. Use the 'help' command to see a list of available commands.", true);
}

function displaySystemInfo() {
    const systemInfo = `
    System Information:
    - Platform: ${navigator.platform}
    - User-Agent: ${navigator.userAgent}
    - Language: ${navigator.language}
    - Screen Resolution: ${window.screen.width}x${window.screen.height}
    - Window Size: ${window.innerWidth}x${window.innerHeight}
    `;
    displayOutput(systemInfo.trim());
}

function displayError(command, correctUsage, details) {
    displayOutput(`Error: Invalid usage of the ${command} command. Usage: ${correctUsage}`, true);
    displayOutput(`Details: ${details}`, true);
    displayOutput(`It looks like you did not use the command correctly. If you need to see a list of available commands, type 'help'.`, true);
}

// Interactive Command Prompt (e.g., confirmation)
function promptUser(message, callback) {
    displayOutput(message);
    inputField.value = '';
    inputField.setAttribute('placeholder', 'Type your response...');
    inputField.focus();
    isAwaitingInput = true;
    inputField.callback = callback;
}

function handleInteractiveInput(input) {
    isAwaitingInput = false;
    inputField.removeAttribute('placeholder');
    if (typeof inputField.callback === 'function') {
        inputField.callback(input);
    }
}

function downloadLog() {
    const logText = log.map(entry => (entry.isError ? '[ERROR] ' : '') + entry.command).join('\n');
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'terminal_log.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

// Event Listener for Command Input
inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = inputField.value.trim();
        displayOutput(`> ${command}`);
        handleCommand(command);
        inputField.value = '';
    } else if (e.key === 'ArrowUp') {
        // History Navigation Up
        if (historyIndex > 0) {
            historyIndex--;
            inputField.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        // History Navigation Down
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            inputField.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            inputField.value = '';
        }
    }
});

window.onload = () => {
    displayOutput("Welcome to RedFox Studios Terminal!\nUse the 'help' command to see all the commands and how to use them.");
};