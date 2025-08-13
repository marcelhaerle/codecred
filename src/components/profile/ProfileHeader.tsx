import { Profile } from "@/lib/types";
import Image from "next/image";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  const avatarSize = profile.theme.profile.avatar.size === 'small' ? 96 : profile.theme.profile.avatar.size === 'medium' ? 128 : 196;

  return (
    <div className="text-center mb-12">
      {profile.image && (
        <Image
          width={avatarSize}
          height={avatarSize}
          src={profile.image}
          alt="Profile Picture"
          className={`${profile.theme.profile.avatar.shape === 'circle' ? 'rounded-full' : 'rounded'} mx-auto mb-4`}
          style={{
            width: `${avatarSize}px`,
            height: `${avatarSize}px`,
            border: `${profile.theme.profile.avatar.borderWidth}px solid ${profile.theme.profile.avatar.borderColor}`,
            boxShadow: `0 0 10px ${profile.theme.profile.avatar.borderColor}`,
          }}
        />
      )}

      <h2
        className={`text-${profile.theme.typography.headingSize}`}
        style={{
          color: profile.theme.colors.primaryText,
          fontWeight: profile.theme.typography.headingWeight,
        }}>
        {profile.name}
      </h2>
      <p
        className={`mt-2 text-${profile.theme.typography.bodySize}`}
        style={{
          color: profile.theme.colors.secondaryText,
          fontWeight: profile.theme.typography.bodyWeight,
        }}
      >{profile.bio}</p>
    </div>
  );
}