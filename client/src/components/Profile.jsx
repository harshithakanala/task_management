import React from "react";
import { Container, Stack } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const Profile = ({ user, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Container className="my-4">
      <h1 className="mb-3 text-center">PROFILE</h1>
      {user && (
        <Stack style={{ width: "fit-content", margin: "0 auto" }} gap={3}>
          <img
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              alignSelf: "center",
            }}
            src={user.avatar && user.avatar.url}
            alt="avatar"
          />
          <Stack gap={1}>
            <Stack direction="horizontal" gap={1}>
              <p className="fw-bold">NAME:</p>
              <p>{user.name}</p>
            </Stack>
            <Stack direction="horizontal" gap={1}>
              <p className="fw-bold">EMAIL:</p>
              <p>{user.email}</p>
            </Stack>
            <Stack direction="horizontal" gap={1}>
              <p className="fw-bold">PHONE:</p>
              <p>{user.phone}</p>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Container>
  );
};

export default Profile;
