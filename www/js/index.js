const baseDate = new Date().getTime();

const log = (title) => console.log(`${new Date().getTime() - baseDate} : ${title}`);
trigger= () => {
    let date = new Date(new Date().getTime() + 3600);
    cordova.plugins.notification.local.schedule([
        { id: 1, title: 'My first notification',
            trigger: {at: date}
        }
    ]);
    log("Notification triggered at " + date);
}

appendResult = (resultName, resultObject) =>{
  const result = document.getElementById("result");
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(resultName + " : "));
  li.appendChild(document.createTextNode(resultObject ? JSON.stringify(resultObject): "NIL"));
  result.appendChild(li);
  console.log(resultName + " : " + resultObject ? JSON.stringify(resultObject): "NIL");
};

clearResults = () => {

    const result = document.getElementById("result");
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
};
app = {
    // Application Constructor
    initialize: function() {
        log("initialize");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById("triggerNotification").addEventListener("click", trigger);
        document.getElementById("clear").addEventListener("click", clearResults);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        log("Device ready");
        appendResult("LaunchDetails", cordova.plugins.notification.local.launchDetails);

        cordova.plugins.notification.local.on("click", (detail, ee) => {
            appendResult("Click detail : ", detail);
            appendResult("Click ee : ", ee);
        });
    }
};

app.initialize();
