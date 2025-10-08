import React from 'react';
import cn from 'classnames';

export interface UserProfileProps {
  name: string;
  avatar?: string;
  avatarAlt?: string;
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  avatar,
  avatarAlt,
  className,
}) => {
  return (
    <div className={cn('start-menu-user-profile', className)}>
      <div className="start-menu-user-profile__avatar">
        {avatar ? (
          <img
            src={avatar}
            alt={avatarAlt || name}
            className="start-menu-user-profile__avatar-image"
          />
        ) : (
          <div className="start-menu-user-profile__avatar-placeholder">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>
      <div className="start-menu-user-profile__name">{name}</div>
    </div>
  );
};

export default UserProfile;
