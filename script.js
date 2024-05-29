document.addEventListener('DOMContentLoaded', () => {
	const startButton = document.getElementById('startButton');
	const gameContainer = document.getElementById('gameContainer');
	const displayText = document.getElementById('displayText');
	const yoasobiButton = document.getElementById('yoasobiButton');
	const yosakoiButton = document.getElementById('yosakoiButton');
	const result = document.getElementById('result');
	const timeDisplay = document.getElementById('time');
	const correctDisplay = document.getElementById('correct');
	const incorrectDisplay = document.getElementById('incorrect');
	const restartButton = document.getElementById('restartButton');
	const counter = document.getElementById('counter');
	const buttonContainer = document.getElementById('buttonContainer');

	let startTime, endTime;
	let correctCount = 0;
	let incorrectCount = 0;
	let currentIndex = 0;
	let texts = [];

	startButton.addEventListener('click', startGame);
	yoasobiButton.addEventListener('click', () => handleAnswer('YOASOBI'));
	yosakoiButton.addEventListener('click', () => handleAnswer('YOSAKOI'));
	restartButton.addEventListener('click', resetGame);

	function startGame() {
			startButton.style.display = 'none';
			gameContainer.style.display = 'block';
			buttonContainer.style.display = 'flex';
			result.style.display = 'none';
			startTime = new Date();
			correctCount = 0;
			incorrectCount = 0;
			currentIndex = 0;
			texts = Array.from({
					length: 20
			}, () => Math.random() < 0.5 ? 'YOASOBI' : 'YOSAKOI');
			displayNextText();
	}

	function displayNextText() {
			if (currentIndex < texts.length) {
					displayText.textContent = texts[currentIndex];
					adjustTextSizeAndPosition();
					counter.textContent = `残り: ${20 - currentIndex} 回`;
			} else {
					endGame();
			}
	}

	function adjustTextSizeAndPosition() {
			// ランダムなフォントファミリーを設定
			const randomFontFamilyIndex = Math.ceil(Math.random() * 10);
			const randomFontFamily = getComputedStyle(document.documentElement).getPropertyValue(`--font-family-${randomFontFamilyIndex}`).trim();
			displayText.style.fontFamily = randomFontFamily;

			// ランダムなフォントサイズを設定
			const randomFontSize = Math.floor(Math.random() * (24 - 10 + 1)) + 10;
			displayText.style.fontSize = `${randomFontSize}px`;

			// テキストの位置をランダムに設定し、ボタンエリアにかからないように調整
			const textWidth = displayText.clientWidth;
			const textHeight = displayText.clientHeight;
			const maxWidth = gameContainer.clientWidth - textWidth;
			const maxHeight = gameContainer.clientHeight - textHeight;
			const randomX = Math.random() * maxWidth;
			const randomY = Math.random() * maxHeight;

			// テキストがボタンエリアにかからないように調整
			const buttonAreaHeight = buttonContainer.clientHeight;
			const adjustedY = randomY > maxHeight - buttonAreaHeight ? maxHeight - buttonAreaHeight : randomY;

			displayText.style.left = `${Math.max(0, Math.min(randomX, maxWidth))}px`;
			displayText.style.top = `${Math.max(0, Math.min(adjustedY, maxHeight))}px`;
	}

	function handleAnswer(answer) {
			if (texts[currentIndex] === answer) {
					correctCount++;
			} else {
					incorrectCount++;
			}
			currentIndex++;
			displayNextText();
	}

	function endGame() {
			endTime = new Date();
			const timeTaken = (endTime - startTime) / 1000; // 秒数を小数点表示
			timeDisplay.textContent = `タイム: ${timeTaken.toFixed(3)}秒`; // 3桁の小数点で表示
			correctDisplay.textContent = `正解数: ${correctCount}`;
			incorrectDisplay.textContent = `不正解数: ${incorrectCount}`;
			gameContainer.style.display = 'none';
			buttonContainer.style.display = 'none';
			result.style.display = 'block';
	}

	function resetGame() {
			result.style.display = 'none';
			startButton.style.display = 'block';
			buttonContainer.style.display = 'none';
	}
});