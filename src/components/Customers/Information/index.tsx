// type
import { CustomerContactInfoProps } from '@/components/Customers/Information/type';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// icons
import { MailIcon, MapPinIcon, UserIcon } from 'lucide-react';

export const CustomerContactInfo = ({ customer }: CustomerContactInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <UserIcon className="h-4 w-4 text-gray-500" />
          <span className="font-medium">{customer.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <MailIcon className="h-4 w-4 text-gray-500" />
          <span>{customer.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPinIcon className="h-4 w-4 text-gray-500" />
          <span>{customer.city}</span>
        </div>
      </CardContent>
    </Card>
  );
};
