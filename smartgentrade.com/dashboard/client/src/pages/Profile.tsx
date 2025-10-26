import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const userData = {
  fullName: "Eric",
  displayName: "Garciaeric",
  email: "falsepegasus@gmail.com",
  dateOfBirth: "",
  address: "",
  membershipId: "#2B4F-734A-EE4D",
  country: "Mexico",
  kycStatus: "rejected",
  dateJoined: "2025-10-16 10:26:17",
  accountLevel: 1,
  balance: "0.00",
};

export default function Profile() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <Avatar className="h-16 w-16">
          <AvatarImage src="" alt={userData.fullName} />
          <AvatarFallback className="bg-primary text-primary-foreground text-xl">
            EC
          </AvatarFallback>
        </Avatar>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              We provide innovative strategies and expert insights to secure your future and build a lasting legacy. Your journey to financial greatness begins now!
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Data</h2>
            {(userData.dateOfBirth === "" || userData.address === "") && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive font-medium">
                  KYC Required - Please update your profile.
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Full Name</p>
              <p className="font-medium" data-testid="text-full-name">{userData.fullName}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Display Name</p>
              <p className="font-medium" data-testid="text-display-name">{userData.displayName}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="font-medium" data-testid="text-email">{userData.email}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
              {userData.dateOfBirth === "" ? (
                <p className="text-sm text-destructive font-medium">
                  KYC Required - Please update your KYC.
                </p>
              ) : (
                <p className="font-medium">{userData.dateOfBirth}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Address</p>
              {userData.address === "" ? (
                <p className="text-sm text-destructive font-medium">
                  KYC Required - Please update your KYC.
                </p>
              ) : (
                <p className="font-medium">{userData.address}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Membership ID</p>
              <p className="font-medium font-mono" data-testid="text-membership-id">{userData.membershipId}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Country</p>
              <p className="font-medium" data-testid="text-country">{userData.country}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">KYC Status</p>
              <Badge
                variant={userData.kycStatus === 'approved' ? 'default' : 'destructive'}
                data-testid="badge-kyc-status"
              >
                {userData.kycStatus}
              </Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Date Joined</p>
              <p className="font-medium" data-testid="text-date-joined">{userData.dateJoined}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Account Level</p>
              <p className="font-medium" data-testid="text-account-level">{userData.accountLevel}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Balance</p>
              <p className="font-medium text-xl tabular-nums" data-testid="text-balance">
                ${userData.balance}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button data-testid="button-edit-profile">Edit Profile</Button>
            <Button variant="outline" data-testid="button-update-kyc">Update KYC</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
