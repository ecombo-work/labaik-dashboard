import { UmrahStatus } from '@/constants/umrah';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';

export const statusColors: Record<UmrahStatus, string> = {
  [UmrahStatus.RECEIVING_OFFERS]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [UmrahStatus.OFFER_ACCEPTED]: 'bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  [UmrahStatus.AWAITING_PAYMENT]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  [UmrahStatus.PAYMENT_COMPLETED]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [UmrahStatus.PAYMENT_FAILED]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  [UmrahStatus.ACCEPTED]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [UmrahStatus.STARTING_SOON]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [UmrahStatus.IN_PROGRESS]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  [UmrahStatus.COMPLETED]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [UmrahStatus.CANCELLED_BY_PERFORMER]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  [UmrahStatus.CANCELLED_BY_SEEKER]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  [UmrahStatus.CANCELLED_BY_ADMIN]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  [UmrahStatus.REQUEST_EXPIRED]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
};
export const getStatusKey = (status: UmrahStatus) => {
  return Object.entries(UmrahStatus).find(([_, value]) => value === status)?.[0] || '';
};
function UmrahStatusBadge({ status }: { status: UmrahStatus }) {
  const t = useTranslations('data_table.umrah.status');
  const statusKey = getStatusKey(status);

  return ( 
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap',
        statusColors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      )}
    >
      {t(statusKey.toLowerCase()) || status}
    </span>
  );
}

export default UmrahStatusBadge;