// type
import { CustomerCardProps } from '@/components/Customers/Grid/Card/type';
// components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// icons
import { DollarSignIcon, MailIcon, MapPinIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';

export const CustomerCard = ({ customer, onSelect }: CustomerCardProps) => {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onSelect(customer)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 rounded-full">
            <UserIcon className="h-4 w-4 text-blue-600" />
          </div>
          <CardTitle className="text-lg">{customer.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MailIcon className="h-4 w-4" />
          <span className="truncate">{customer.email}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPinIcon className="h-4 w-4" />
          <span>{customer.city}</span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <div className="flex items-center gap-1 text-sm">
            <DollarSignIcon className="h-4 w-4 text-green-600" />
            <span className="text-green-600 font-medium">
              {new Intl.NumberFormat('kk-KZ', {
                style: 'currency',
                currency: 'KZT',
                notation: 'compact',
                maximumFractionDigits: 0,
              }).format(customer.ltv)}
            </span>
            <span className="text-gray-500 text-xs">LTV</span>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <ShoppingCartIcon className="h-4 w-4 text-blue-600" />
            <span className="text-blue-600 font-medium">{customer.ordersCount}</span>
            <span className="text-gray-500 text-xs">orders</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
