(function(){
  let players = [];
  let amountOfTeamsSelect = document.querySelector('#amountOfTeamsSelect');
  let amountOfTeamsValue = amountOfTeamsSelect.value;
  let addPlayerBtn = document.querySelector('#addPlayerBtn');
  let createTeamsBtn = document.querySelector('#createTeamsBtn');
  let playersList = document.querySelector('#playersList');
  let teams = document.querySelector('#teams');

  function addIndex () {
    let playerItems = Array.from(document.querySelectorAll('#playersList li'));

    playerItems.map((playerItem, counter) => {
      playerItem.setAttribute("data-index", counter + 1);
    });
  }

  function submitPlayer(e) {
    e.preventDefault();

    let playerInput = document.querySelector('#playerInput');
    let playerInputValue = playerInput.value;

    if (playerInputValue !== '') {

      let newPlayer = playerInputValue;
      let newLi = `<li class="tag is-danger mr-2">
                     <span class="mr-2">${newPlayer}</span>
                     <span class="delete is-small">x</span>
                   </li>`;

      playersList.insertAdjacentHTML('beforeend', newLi);

      players.push(newPlayer);

      addIndex();

      playerInput.value = '';

      let deleteButtons = document.querySelectorAll('.delete');

      function deletePlayer(event){
        event.stopPropagation();
        event.stopImmediatePropagation();

        this.parentNode.remove();

        let deleteStart = this.parentNode.dataset.index -1;

        players.splice(deleteStart, 1);

        addIndex();
      };

      deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', deletePlayer));

    } // end of if input not empty

  };


  function createTeams(e) {
    e.preventDefault();

    if (players != '') {
      teams.innerHTML = '';

      let randomizedPlayers = [...players];
      let n = randomizedPlayers.length;
      let tempArr = [];
      for ( let i = 0; i < n-1; i++ ) {
        // The following line removes one random element from randomizedPlayers and pushes it onto tempArr
        tempArr.push(randomizedPlayers.splice(Math.floor(Math.random()*randomizedPlayers.length),1)[0]);
      }
      // Push the remaining item onto tempArr
      tempArr.push(randomizedPlayers[0]);
      // console.log(randomizedPlayers);
      randomizedPlayers = tempArr;

      function grouper(array, cols) {
        
        function split(array, cols) {
            if (cols==1) return array;
            let size = Math.ceil(array.length / cols);
            return array.slice(0, size).concat([null]).concat(split(array.slice(size), cols-1));
        }

        let a = split(array, cols);
        let groups = [];
        let group = [];
        for(let i = 0; i < a.length; i++) {
            if (a[i] === null) {
                groups.push(group);
                group = [];
                continue;
             }
            group.push(a[i]);
        }
        groups.push(group);
        return groups;
      }

      let teamsArray = (grouper(randomizedPlayers, amountOfTeamsValue));

      teams.innerHTML = ( teamsArray.map((team, index) => {
        return `
          <div class="column is-flex">
            <div class="team-list tile is-child notification has-background-link has-text-light">
              <p class="has-text-weight-bold">TEAM ${index + 1}</p>
              <ul> ${team.map(player => {
                return `<li>${player}</li>`;
                }).join('')}
              </ul>
            </div>
          </div>
        `;
      }).join(''));

    } else {
      teams.innerHTML = '';
    }
  };

  // button click events
  addPlayerBtn.addEventListener('click', submitPlayer);
  createTeamsBtn.addEventListener('click', createTeams);

  // select change event
  amountOfTeamsSelect.addEventListener('change',function(){
    return amountOfTeamsValue = this.value;
  });
})();