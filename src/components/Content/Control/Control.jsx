import React from "react";
import "./Control.css"



const Control = (props) => {
    const { token } = props;    

    

    const turnonDen = async () => {
      var myHeaders = new Headers();
      myHeaders.append("X-Authorization", `Bearer ${token}`);
  
      var raw = JSON.stringify({
        method: "SET_VALUE",
        params: {
          device_code: "s71200",
          parameter_setting: {
            den: 1,
          },
        },
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      fetch(
        "http://iotmind.ddns.net:9090/api/plugins/rpc/oneway/01c29100-e095-11ec-bd5f-c14f24572088",
        requestOptions
      ) 
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    };   
    const turnoffDen = async () => {
        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", `Bearer ${token}`);
    
        var raw = JSON.stringify({
          method: "SET_VALUE",
          params: {
            device_code: "s71200",
            parameter_setting: {
              den: 0,
            },
          },
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        fetch(
          "http://iotmind.ddns.net:9090/api/plugins/rpc/oneway/01c29100-e095-11ec-bd5f-c14f24572088",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
    };
    



    const stopPLC = async () => {
        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", `Bearer ${token}`);
    
        var raw = JSON.stringify({
          method: "SET_VALUE",
          params: {
            device_code: "s71200",
            parameter_setting: {
              stop: 1,
              start: 0,
            },
          },
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        fetch(
          "http://iotmind.ddns.net:9090/api/plugins/rpc/oneway/01c29100-e095-11ec-bd5f-c14f24572088",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
    };   
    const startPLC = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", `Bearer ${token}`);
    
        var raw = JSON.stringify({
          method: "SET_VALUE",
          params: {
            device_code: "s71200",
            parameter_setting: {
              start: 1,
              stop: 0,
            },
          },
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        fetch(
          "http://iotmind.ddns.net:9090/api/plugins/rpc/oneway/01c29100-e095-11ec-bd5f-c14f24572088",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
    };
    



    const turnonMayHutAm = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", `Bearer ${token}`);
    
        var raw = JSON.stringify({
          method: "SET_VALUE",
          params: {
            device_code: "s71200",
            parameter_setting: {
              mayhutam: 1,
            },
          },
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        fetch(
          "http://iotmind.ddns.net:9090/api/plugins/rpc/oneway/01c29100-e095-11ec-bd5f-c14f24572088",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
    };    
    const turnoffMayHutAm = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", `Bearer ${token}`);
    
        var raw = JSON.stringify({
          method: "SET_VALUE",
          params: {
            device_code: "s71200",
            parameter_setting: {
              mayhutam: 0,
            },
          },
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        fetch(
          "http://iotmind.ddns.net:9090/api/plugins/rpc/oneway/01c29100-e095-11ec-bd5f-c14f24572088",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
    };




    const turnonQuat1 = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", `Bearer ${token}`);
    
        var raw = JSON.stringify({
          method: "SET_VALUE",
          params: {
            device_code: "s71200",
            parameter_setting: {
              quat1: 1
            },
          },
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        fetch(
          "http://iotmind.ddns.net:9090/api/plugins/rpc/oneway/01c29100-e095-11ec-bd5f-c14f24572088",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
    };
    const turnoffQuat1 = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", `Bearer ${token}`);
    
        var raw = JSON.stringify({
          method: "SET_VALUE",
          params: {
            device_code: "s71200",
            parameter_setting: {
              quat1: 0
            },
          },
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        fetch(
          "http://iotmind.ddns.net:9090/api/plugins/rpc/oneway/01c29100-e095-11ec-bd5f-c14f24572088",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
    };



    const turnonQuat2 = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", `Bearer ${token}`);
    
        var raw = JSON.stringify({
          method: "SET_VALUE",
          params: {
            device_code: "s71200",
            parameter_setting: {
              quat2: 1
            },
          },
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        fetch(
          "http://iotmind.ddns.net:9090/api/plugins/rpc/oneway/01c29100-e095-11ec-bd5f-c14f24572088",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
    };
    const turnoffQuat2 = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", `Bearer ${token}`);
    
        var raw = JSON.stringify({
          method: "SET_VALUE",
          params: {
            device_code: "s71200",
            parameter_setting: {
              quat2: 0
            },
          },
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        fetch(
          "http://iotmind.ddns.net:9090/api/plugins/rpc/oneway/01c29100-e095-11ec-bd5f-c14f24572088",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
    };




    const turnonQuat3 = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", `Bearer ${token}`);
    
        var raw = JSON.stringify({
          method: "SET_VALUE",
          params: {
            device_code: "s71200",
            parameter_setting: {
              quat3: 1
            },
          },
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        fetch(
          "http://iotmind.ddns.net:9090/api/plugins/rpc/oneway/01c29100-e095-11ec-bd5f-c14f24572088",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
    };
    const turnoffQuat3 = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("X-Authorization", `Bearer ${token}`);
    
        var raw = JSON.stringify({
          method: "SET_VALUE",
          params: {
            device_code: "s71200",
            parameter_setting: {
              quat3: 0
            },
          },
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        fetch(
          "http://iotmind.ddns.net:9090/api/plugins/rpc/oneway/01c29100-e095-11ec-bd5f-c14f24572088",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
    };


  return (
    <div className="bg-dashboard">
      <h2 id="DASHBOARD">DASHBOARD</h2> 
        <div className="plc bg">
          <h2>PLC</h2>
          <img src="images/plcS71200.png" alt="plc" className="img img-plc" />
          
          <button className="start" onClick={() => {
                  startPLC();
                }}>
                  TURN ON
          </button>
          <button className="stop" onClick={() => {
                  stopPLC();
                }}>
                  TURN OFF
          </button>
        </div>
                  
        <div className="dashboard-content">
          <div className="lamp bg">
            <h2>LAMP</h2>
            <img src="images/lamp.jpg" alt="lamp" className="img img-lamp" />
            
            <button className="start" onClick={() => {
                    turnonDen();
                  }}>
                    TURN ON
            </button>
            <button className="stop" onClick={() => {
                    turnoffDen();
                  }}>
                    TURN OFF
            </button>
          </div>

          <div className="fan bg">
            <h2>FAN</h2>
            <img src="images/fan.png" alt="fan" className="img img-fan" />              
            <div>
              <p className="mar-25">FAN 1</p>
              <button className="start top-30" onClick={() => {
                      turnonQuat1();
                    }}>
                      TURN ON
              </button>
              <button className="stop top-30" onClick={() => {
                      turnoffQuat1();
                    }}>
                      TURN OFF
              </button>
            </div>

            <div>
              <p className="mar-65">FAN 2</p>
              <button className="start top-120" onClick={() => {
                      turnonQuat2();
                    }}>
                      TURN ON
              </button>
              <button className="stop top-120" onClick={() => {
                      turnoffQuat2();
                    }}>
                      TURN OFF
              </button>
            </div>

            <div>
              <p className="mar-65">FAN 3</p>
              <button className="start top-210" onClick={() => {
                      turnonQuat3();
                    }}>
                      TURN ON
              </button>
              <button className="stop top-210" onClick={() => {
                      turnoffQuat3();
                    }}>
                      TURN OFF
              </button>
            </div>
          </div>

          <div className="lamp bg">
            <h2>DEHUMIDIFIES</h2>
            <img src="images/DEHUMIDIFIES.png" alt="lamp" className="img img-lamp" />
            
            <button className="start" onClick={() => {
                    turnonMayHutAm();
                  }}>
                    TURN ON
            </button>
            <button className="stop" onClick={() => {
                    turnoffMayHutAm();
                  }}>
                    TURN OFF
            </button>
          </div>
        </div> 
    </div>
  );
};

export default Control;
