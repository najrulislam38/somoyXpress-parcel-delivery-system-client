// adjust path

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import type { IUser } from "@/types";

import { Mail, Phone, MapPin } from "lucide-react";

export function Profile() {
  const { data: userData } = useUserInfoQuery(undefined);

  const user = userData?.data as IUser;
  return (
    <div>
      <Card className="w-full max-w-md mx-auto rounded-2xl shadow-md border">
        <CardHeader className="flex flex-col items-center gap-3">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.picture} alt={user?.name} />
            <AvatarFallback className="text-lg font-medium">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl font-semibold text-center">
            {user?.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 flex flex-col items-center justify-center text-sm">
          {/* Email */}
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{user?.email}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{user?.phone}</span>
          </div>

          {/* Address */}
          {user?.address && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{user.address}</span>
            </div>
          )}

          {/* todo */}
          <div className="mt-6">
            <Button className="text-xs cursor-pointer">Update Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
