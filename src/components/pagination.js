// import React from "react";

// class Pagination extends React {
//   NextPage = async () => {
//     this.setState({ data: [] });
//     let access_token = await localStorage.getItem("token");
//     // https://gmail.googleapis.com/gmail/v1/users/qasimamin7877%40gmail.com/messages?maxResults=20&pageToken=06711908679528323284
//     await axios
//       .get(
//         `https://gmail.googleapis.com/gmail/v1/users/qasimamin7877@gmail.com/messages?maxResults=25&pageToken=${this.state.pageToken}`,
//         {
//           headers: {
//             Authorization: "Bearer " + access_token,
//           },
//           // maxResults: 25,
//         }
//       )
//       .then(async (nextData) => {
//         this.setState({ array: nextData.data.messages });
//         this.setState({ pageToken: nextData.data.pageToken.id });
//         this.Rerendered();
//       })
//       .catch((err) => console.log("err", err));
//   };

//   return (
//     <div className="ui fluid center aligned container">
//       <div
//         aria-label="Pagination Navigation"
//         role="navigation"
//         className="ui pagination menu"
//       >
//         <a
//           aria-current="false"
//           aria-disabled="false"
//           tabIndex="0"
//           value="1"
//           aria-label="Previous item"
//           type="prevItem"
//           className="item"
//         >
//           ⟨
//         </a>
//         <a
//           // onClick={this.NextPage}
//           aria-current="false"
//           aria-disabled="false"
//           tabIndex="0"
//           value="2"
//           aria-label="Next item"
//           type="nextItem"
//           className="item"
//         >
//           ⟩
//         </a>
//       </div>
//     </div>
//   );
// };
// export default Pagination;
