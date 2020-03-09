window.addEventListener('load', function() {
	if(document.readyState == 'complete') {
		// Character Count and Limit
	  	var trigger = document.querySelector('[data-limitinput]');
		if(!trigger || trigger == null){
			trigger = document.querySelector('.ql-editor');
		}
		if(!trigger){return;} else {
			trigger.addEventListener('input', updateCharacterCount);
			trigger.addEventListener('paste', updateCharacterCount);
			trigger.addEventListener('change', updateCharacterCount);
			trigger.addEventListener('keydown', updateCharacterCount);
			trigger.addEventListener('keyup', updateCharacterCount);
		}

		var wysiwygFlag = false;

		if(trigger.innerHTML){
			var characterCount = trigger.textContent.length;
			var displayCount = trigger.textContent.length;
			wysiwygFlag = true;
		} else {
			var characterCount = trigger.value.length;
			var displayCount = trigger.value.length;
		}

		var completeIndicator = document.querySelector('[data-completeindicator]');
		var countAndLimitElement = document.querySelector('[data-countandlimit]');
		var limitIndicator = document.querySelector('[data-limitindicator]');
		var progressElement = document.querySelector('.progress');

		var countMax = completeIndicator.getAttribute('aria-valuemax');
		var countMin = completeIndicator.getAttribute('aria-valuemin');
		var displayCount = completeIndicator.getAttribute('aria-valuenow');
		var countWarn = countMax * 0.9;
		var displayLimit = countMax;

		updateCharacterCount();

		function updateCharacterCount() {

			if(wysiwygFlag){
				displayCount = trigger.textContent.length;
			} else {
				displayCount = trigger.value.length;
			}

			completeIndicator.setAttribute('aria-valuenow', displayCount);
			countAndLimitElement.innerHTML = displayCount + ' / ' + displayLimit;
			completeIndicator.style = 'width: ' + displayCount / displayLimit * 100 + '%';

			if(displayCount > countMax || displayCount < countMin){
	 			progressElement.setAttribute('class', 'progress progress-is-error');
	 		} else if(displayCount > countWarn){
	 			progressElement.setAttribute('class', 'progress progress-is-warning');
	 		} else if(displayCount >= countMin && displayCount <= countMax){
				progressElement.setAttribute('class', 'progress progress-is-success');
	 		} else {
	 			progressElement.setAttribute('class', 'progress');
	 		}
		}
	}
});