import React from 'react';

interface AvatarProps {
  imageUrl?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
};

export const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  name,
  size = 'md',
}) => {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const defaultImage =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

  return (
    <div
      className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200`}
    >
      {imageUrl || defaultImage ? (
        <img
          src={imageUrl || defaultImage}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImage;
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-2xl font-semibold">
          {initials}
        </div>
      )}
    </div>
  );
};
