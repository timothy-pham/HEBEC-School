import React, {createContext, useState} from 'react';

interface Profile {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  username?: string;
}

interface ProfileContext {
  info: Profile;
  setInfo: (state: Profile) => void;
}

export const ProfileContext = createContext<ProfileContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export const ProfileProvider: React.FC<Props> = ({children}) => {
  const [info, setInfo] = useState({});

  return (
    <ProfileContext.Provider value={{info, setInfo}}>
      {children}
    </ProfileContext.Provider>
  );
};
