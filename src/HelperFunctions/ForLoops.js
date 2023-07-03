function GetAllPending(index) {
  let pending = [];
  for (var i = 0; i < data[index].pending.length; i++) {
    //console.log(data[index].pending[i]);
  }
  return data[index].pending;
}
function GetAllActive(index) {
  return data[index].active;
}
function GetAll() {
  for (var i = 0; i < data.length; i++) {
    active.push(GetAllActive(i));
    pending.push(GetAllPending(i));
  }
}
function AllHistory() {
  //Get all pending
  for (var i = 0; i < data.length; i++) {
    //data[i] is the object that contains arrays active, pending, etc
    for (var x = 0; x < data[i].pending.length; x++) {
      var pendingObj = {
        state: "Pending",
        amount: data[i].pending[x].amount,
        paydate: data[i].pending[x].paydate,
        payee: data[i].pending[x].payee,
        index: x,
      };
      allHistory.push(pendingObj);
    }
  }
  //Get all active
  for (var i = 0; i < data.length; i++) {
    //data[i] is the object that contains arrays active, pending, etc
    for (var x = 0; x < data[i].active.length; x++) {
      var activeObj = {
        state: "Active",
        amount: data[i].active[x].amount,
        paydate: data[i].active[x].paydate,
        payee: data[i].active[x].payee,
        index: x,
      };

      allHistory.push(activeObj);
    }
  }
}
AllHistory();
function GetAllIds() {
  let idInfo = [];
  for (var i = 0; i < data.length; i++) {
    let accountName = accounts
      .filter((item) => item.accountId == data[i].accountID)
      .pop().accountName;
    idInfo.push({ i, accountName });
  }
  return idInfo;
}

//access objects inside array inside object inside array
// [{id:"", [{}, {}]},{}]
function getHistory() {
  data.map((item) => {
    for (let i = 0; i < item.billHistory.length; i++) {
      const historyObj = item.billHistory[i];
      history.push(historyObj);
    }
  });
}
