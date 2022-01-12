import React from "react";

const Display = (props) => {
  return (
    <div className="thirteen wide column">
      {props.data.length !== 0
        ? props.data.map((item, index) => {
            return (
              <div
                onClick={() =>
                  props.history.push({
                    pathname: "/display",
                    state: { id: item.id },
                  })
                }
                key={index}
              >
                <div
                  className="ui grid"
                  // style={
                  //   item.labelIds.includes("UNREAD")
                  //     ? { backgroundColor: "#F5F5F5" }
                  //     : { backgroundColor: "#fff" }
                  // }
                >
                  <div
                    className="three wide column"
                    style={{
                      overflow: "hidden",
                      height: 37,
                      cursor: "pointer",
                    }}
                  >
                    {item.payload.headers.map((name, key) => {
                      return (
                        <div key={key}>
                          {name.name === "From" && name.value}
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className="four wide column"
                    style={{
                      overflow: "hidden",
                      height: 37,
                      cursor: "pointer",
                    }}
                  >
                    {item.payload.headers.map((name, key) => {
                      return (
                        <div key={key}>
                          {name.name === "Subject" && name.value}
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className="nine wide column"
                    style={{
                      overflow: "hidden",
                      height: 37,
                      cursor: "pointer",
                    }}
                  >
                    {item.snippet}
                  </div>
                </div>
                <div className="ui divider"></div>
              </div>
            );
          })
        : null}
    </div>
  );
};
export default Display;
