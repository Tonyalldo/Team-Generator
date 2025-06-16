// Store players in arrays
const batsmen = [];
const bowlers = [];
const allrounders = [];
const wicketkeepers = [];

// Add player to category list
function addPlayer(type) {
  const input = document.getElementById(`${type}Input`);
  const name = input.value.trim();
  if (name === "") return;

  let list, array;
  switch (type) {
    case 'batsman':
      array = batsmen;
      list = document.getElementById('batsmanList');
      break;
    case 'bowler':
      array = bowlers;
      list = document.getElementById('bowlerList');
      break;
    case 'allrounder':
      array = allrounders;
      list = document.getElementById('allrounderList');
      break;
    case 'wicketkeeper':
      array = wicketkeepers;
      list = document.getElementById('wicketkeeperList');
      break;
  }

  array.push(name);
  const li = document.createElement("li");
  li.textContent = name;
  list.appendChild(li);
  input.value = "";
}

// Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate teams
function generateTeams() {
  const numTeams = parseInt(document.getElementById('numTeams').value);
  const output = document.getElementById('output');
  output.innerHTML = "";

  if (
    batsmen.length < 4 ||
    allrounders.length < 3 ||
    bowlers.length < 3 ||
    wicketkeepers.length < 1
  ) {
    output.innerHTML = "<p style='color:red;'>Not enough players in each category to form a team.</p>";
    return;
  }

  for (let t = 1; t <= numTeams; t++) {
    const team = document.createElement('div');
    team.className = "team";

    const teamBatsmen = shuffle([...batsmen]).slice(0, 4);
    const teamAllRounders = shuffle([...allrounders]).slice(0, 3);
    const teamBowlers = shuffle([...bowlers]).slice(0, 3);
    const teamWicketKeeper = shuffle([...wicketkeepers]).slice(0, 1);

    team.innerHTML = `
      <h3>Team ${t}</h3>
      <strong>Batsmen:</strong> ${teamBatsmen.join(", ")}<br/>
      <strong>All-Rounders:</strong> ${teamAllRounders.join(", ")}<br/>
      <strong>Bowlers:</strong> ${teamBowlers.join(", ")}<br/>
      <strong>Wicket Keeper:</strong> ${teamWicketKeeper.join(", ")}<br/>
    `;
    output.appendChild(team);
  }
}
