document.getElementById('playersCard').addEventListener('click', function(event) {
  addNewPlayerToList(event);
});

document.getElementById('playersListShow').addEventListener('click', function(event) {
  removePlayerToList(event);
})


document.getElementById('perPlayerCostInputField').addEventListener('click', function() {
  inputFieldValidationById('perPlayerCostInputField')
});


let playerTotalExpenses;
document.getElementById('calculateBtn').addEventListener('click', function() {
playerTotalExpensesCalculation();
});


let managerCost;
document.getElementById('managerCostInputField').addEventListener('click', function() {
  managerCost = inputFieldValidationById('managerCostInputField');
  if(managerCost && coachCost) {
    document.getElementById('calculateTotalBtn').disabled = false;
  } else {
    document.getElementById('calculateTotalBtn').disabled = true;
  }
});


let coachCost;
document.getElementById('coachCostInputField').addEventListener('click', function() {
  coachCost = inputFieldValidationById('coachCostInputField')
    if(managerCost && coachCost) {
      document.getElementById('calculateTotalBtn').disabled = false;
    } else {
      document.getElementById('calculateTotalBtn').disabled = true;
    
    }
  });


  document.getElementById('calculateTotalBtn').addEventListener('click', function() {
    totalExpensesCalculation();
  });


  function addNewPlayerToList(event) {
    const isSelectBtnClicked = event.target.classList.contains('select-btn');
    if(isSelectBtnClicked) {
      const totalPlayersAdded = document.getElementById('playersListShow').childNodes.length;
      if(totalPlayersAdded < 5) {
        const getPlayerName = event.target.parentNode.childNodes[1].innerText;
        const newPlayerListTag = document.createElement('li');
        newPlayerListTag.innerHTML = "<span class='listed-player-name'>" + getPlayerName + "</span>" + "<span class='remove-player text-danger'>❌</span>";
        document.getElementById('playersListShow').appendChild(newPlayerListTag);
        event.target.innerText = 'Selected';
        event.target.disabled = true;

      } else {
        alert('already added 5 players')
      }
      

      const numberOfPlayerSelected = document.getElementById('playersListShow').childElementCount;
      if(numberOfPlayerSelected > 0) {
        document.getElementById('calculateBtn').disabled = false;
      } else {
        document.getElementById('calculateBtn').disabled = true;
      }
    
    }
  }


  function removePlayerToList(event) {
    const isRemovePlayerBtnClicked = event.target.classList.contains('remove-player');
    if(isRemovePlayerBtnClicked) {
      const removingPlayerListTag = event.target.parentNode;
      const removingPlayerName = removingPlayerListTag.firstChild.innerText;

      const cardPlayersName = document.querySelectorAll('.card-title');
      for(const cardPlayeName of cardPlayersName) {
        if(cardPlayeName.innerText === removingPlayerName) {
          cardPlayeName.parentNode.lastElementChild.disabled = false;
          cardPlayeName.parentNode.lastElementChild.innerText = 'Select';
        }
      }
      removingPlayerListTag.parentNode.removeChild(removingPlayerListTag);

      const numberOfPlayerSelected = document.getElementById('playersListShow').childElementCount;

      if(numberOfPlayerSelected > 0) {
        document.getElementById('calculateBtn').disabled = false;

      } else {
        document.getElementById('calculateBtn').disabled = true;
      }

      const perPlayerInputValue = parseFloat(document.getElementById('perPlayerCostInputField').value);

      if(perPlayerInputValue > 0) {
        playerTotalExpensesCalculation();
      }

    }
  }



  function inputFieldValidationById(inputFieldId) {
    const inputFieldValue = document.getElementById(inputFieldId).value;
      if(inputFieldId === '') {
        alert('input field empty');
        return false;
      } else if(isNaN (inputFieldValue) || inputFieldValue < 0) {
        alert('input field positive');
        return false;
      } else {
        return parseFloat(inputFieldValue);
      }

  }


  function playerTotalExpensesCalculation() {
    const perPlayerCost = inputFieldValidationById('perPlayerCostInputField');
    const numberOfPlayerSelected = document.getElementById('playersListShow').childElementCount;
    if( perPlayerCost && numberOfPlayerSelected) {
      playerTotalExpenses = perPlayerCost * numberOfPlayerSelected;
      return document.getElementById('playerTotalExpenses').innerText = playerTotalExpenses;
    } else {
      playerTotalExpenses = 0;
      return document.getElementById('playerTotalExpenses').innerText = '00'
    }
  }

  function totalExpensesCalculation() {
    if(playerTotalExpenses && managerCost && coachCost) {
      const totalExpenses = playerTotalExpenses + managerCost + coachCost;
      document.getElementById('totalExpenses').innerText = totalExpenses;

    } else if(!playerTotalExpenses) {
      alert('complete first section');
      return;
    } else if(!managerCost && !coachCost) {
      inputFieldValidationById('managerCostInputField');
      inputFieldValidationById('coachCostInputField');
    }
  }


  









