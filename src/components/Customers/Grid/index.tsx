// components
import { CustomerCard } from '@/components/Customers/Grid/Card';
import { CustomersGridProps } from '@/components/Customers/Grid/type';
import { Card, CardContent } from '@/components/ui/card';
// type
import { Customer } from '@/providers/type';
// icons
import { UserIcon } from 'lucide-react';

export const CustomersGrid = ({
  customers,
  filteredCustomers,
  isLoading,
  onSelectCustomer,
}: CustomersGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 animate-pulse rounded" />
                <div className="h-3 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (filteredCustomers.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8 text-gray-500">
            <UserIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No customers found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        Showing {filteredCustomers.length} of {customers.length} customers
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer: Customer) => (
          <CustomerCard customer={customer} key={customer.id} onSelect={onSelectCustomer} />
        ))}
      </div>
    </div>
  );
};
