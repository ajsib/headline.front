// ProfilePage.js
import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../../../utils/userProfile/UserInfo';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import ProfileCard from './profile/ProfileCard';
import TabsCard from './profile/TabsCard'
import T1B from  './templates/t1b';
import T1F from  './templates/t1f';

const ProfileCardContainer = styled(Box)`
  position: relative;
  top: -10px;
  margin: auto;
  width: 80%;
  z-index: 1;
`;

const TabsCardContainer = styled(Box)`
  z-index: 2;
  margin-top: 3px;
`;

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const { profile } = getUserInfo();
    console.log(profile)
    if (profile) {
      setUserInfo({
        _id: profile._id,
        name: profile.name,
        username: profile.username,
        program: profile.program,
        yearOfStudy: profile.yearOfStudy,
        yearOfStudyString: profile.yearOfStudyString,
        bio: profile.bio,
        userEmoji: profile.programEmoji,
        dateJoined: profile.dateJoinedHR,
        likes: profile.likes,
        posts: profile.posts
      });
    }
  }, []);

  console.log(userInfo.likes)
  console.log(userInfo.posts)

  return (
    <Box
      sx={{
        position: 'relative', // Notice it's position, not display
        // display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <ProfileCardContainer>
        <ProfileCard userInfo={userInfo} canEdit={true} />
      </ProfileCardContainer>
      <TabsCardContainer>
        <TabsCard selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </TabsCardContainer>
    </Box>
  );
};

export default ProfilePage;