import React from 'react';
import { Avatar, AvatarProps } from '@mui/material';

interface CustomAvatarProps extends AvatarProps {
  name: string;
  profilePicture?: string;
}

const stringToColor = (string: string): string => {
  let hash = 0;
  let i;

  for (i = 0; i < string?.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

const stringAvatar = (
  name: string
): { sx: { bgcolor: string }; children: string } => {
  const initials = name
    ?.split(' ')
    .map((word) => word[0])
    .join('');
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
};

export const CustomAvatar: React.FC<CustomAvatarProps> = ({
  name,
  profilePicture,
  sx,
  ...props
}) => {
  const customSx = {
    ...sx,
    ...(profilePicture ? {} : stringAvatar(name).sx),
  };

  return (
    <Avatar src={profilePicture} {...props} sx={customSx}>
      {!profilePicture && stringAvatar(name).children}
    </Avatar>
  );
};
