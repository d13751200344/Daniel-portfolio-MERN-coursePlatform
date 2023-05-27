const ProfileComponent = (props) => {
  let { currentUser, setCurrentUser } = props;

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>Please log in first.</div>}
      {currentUser && (
        <div>
          <h2>Profile: </h2>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Name: {currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Email: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Role: {currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
