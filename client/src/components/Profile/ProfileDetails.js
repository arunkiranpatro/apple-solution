import React from "react";
import { connect } from "react-redux";

function ProfileTemplate({ user, gender, age, interests }) {
  let interestsStr = "Not Applicable";
  if (interests) {
    interestsStr = interests.join(",");
  }

  return (
    <div className="profile-details">
      <div>
        <label>Name : </label>
        <span>{user.name}</span>
      </div>
      <div>
        <label>Gender : </label>
        <span>{gender}</span>
      </div>
      <div>
        <label>Age : </label>
        <span>{age}</span>
      </div>
      <div>
        <label>Interests : </label>
        <span>{interestsStr}</span>
      </div>
      <hr></hr>
    </div>
  );
}

function ProfileDetails({ profile }) {
  function getContent() {
    if (profile) {
      return (
        <>
          <ProfileTemplate {...profile.currentProfile} />
          <h2>Recommendations</h2>
          {profile.recos &&
            profile.recos.map((profile, index) => {
              return <ProfileTemplate key={index} {...profile} />;
            })}
        </>
      );
    }
  }
  return getContent();
}

const mapStateToProps = state => {
  return {
    profile: state.profile.profile
  };
};

export default connect(mapStateToProps)(ProfileDetails);
