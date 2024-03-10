const dateInput = document.getElementById('date');
const dateSelectBtn = document.getElementById('dateSelectBtn');
const dateDisplay = document.getElementById('dateDisplay');
const lottAdd = document.getElementById('lottAdd');
const lottInput = document.getElementById('lottInput');
const entriesCtn = document.getElementById('entries');

const checkBtn = document.getElementById('checkBtn');

let dateValue = '';
let entries = [];

dateSelectBtn.addEventListener('click', () => {
  dateInput.showPicker();
});

dateInput.addEventListener('input', () => {
  const extracted = dateInput.value.split('-');

  const year = extracted[0];
  const month = extracted[1];
  const day = extracted[2];

  const months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };

  dateDisplay.textContent = `Selected date: ${day} ${
    months[Number(month)]
  } ${year}`;
  dateValue = `${day}${month}${Number(year) + 543}`;
});

lottInput.addEventListener('input', () => {
  if (lottInput.value.length === 6 || !entries.includes(lottInput.value)) {
    lottAdd.disabled = false;
  }

  if (lottInput.value.length !== 6 || entries.includes(lottInput.value)) {
    lottAdd.disabled = true;
  }
});

lottAdd.addEventListener('click', () => {
  const node = document.createElement('p');
  const textNode = document.createTextNode(lottInput.value);

  node.appendChild(textNode);

  entriesCtn.appendChild(node);
  entries.push(String(lottInput.value));
  checkBtn.disabled = false;

  lottInput.value = '';
  lottAdd.disabled = true;
});

checkBtn.addEventListener('click', () => {
  check(entries, dateValue);

  entries = [];
  removeAllChildNodes(entriesCtn);
  checkBtn.disabled = true;
});

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//

async function check(numbers, date) {
  fetch(`https://lotto.api.rayriffy.com/lotto/${date}`)
    .then((res) => res.json())
    .then((body) => {
      const data = body.response;

      if (!data.date) return alert('Invalid date or no entries.');

      console.log(`Checking lottery for ${data.date}\n`);

      let moneyWon = 0;
      let winText = '';

      numbers.forEach((value) => {
        value = String(value);

        if (data.prizes[0].number.includes(value)) {
          winText += `Won รางวัลที่ 1 (${data.prizes[0].reward} baht) for number ${value}\n`;
          moneyWon += Number(data.prizes[0].reward);
        }

        if (data.prizes[1].number.includes(value)) {
          winText += `Won รางวัลข้างเคียงรางวัลที่ 1 (${data.prizes[1].reward} baht) for number ${value}\n`;
          moneyWon += Number(data.prizes[1].reward);
        }

        if (data.prizes[2].number.includes(value)) {
          winText += `Won รางวัลที่ 2 (${data.prizes[2].reward} baht) for number ${value}\n`;
          moneyWon += Number(data.prizes[2].reward);
        }

        if (data.prizes[3].number.includes(value)) {
          winText += `Won รางวัลที่ 3 (${data.prizes[3].reward} baht) for number ${value}\n`;
          moneyWon += Number(data.prizes[3].reward);
        }

        if (data.prizes[4].number.includes(value)) {
          winText += `Won รางวัลที่ 4 (${data.prizes[4].reward} baht) for number ${value}\n`;
          moneyWon += Number(data.prizes[4].reward);
        }

        if (data.prizes[5].number.includes(value)) {
          winText += `Won รางวัลที่ 5 (${data.prizes[5].reward} baht) for number ${value}\n`;
          moneyWon += Number(data.prizes[5].reward);
        }

        if (data.runningNumbers[0].number.includes(value.substring(0, 2))) {
          winText += `Won รางวัลเลขหน้า 3 ตัว (${data.runningNumbers[0].reward} baht) for number ${value}\n`;
          moneyWon += Number(data.runningNumbers[0].reward);
        }

        if (data.runningNumbers[1].number.includes(value.substring(3, 6))) {
          winText += `Won รางวัลเลขท้าย 3 ตัว (${data.runningNumbers[1].reward} baht) for number ${value}\n`;
          moneyWon += Number(data.runningNumbers[1].reward);
        }

        if (data.runningNumbers[2].number.includes(value.substring(4, 6))) {
          winText += `Won รางวัลเลขท้าย 2 ตัว (${data.runningNumbers[2].reward} baht) for number ${value}\n`;
          moneyWon += Number(data.runningNumbers[2].reward);
        }
      });

      if (!moneyWon) {
        alert(
          "Unfortunately, you haven't won any lottery.\nBetter luck next time!"
        );
      } else {
        alert(
          winText +
            `\nCongratulations! You have won a total of ${moneyWon} baht!`
        );
      }
    });
}

//
