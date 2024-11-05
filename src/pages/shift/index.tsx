import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import Fallback from '../../components/Fallback';
import { Loading } from '../../components/Loading';
import { PatientInfoSection } from '../../components/PatientInfo';
import { PaymentDetailsSection } from '../../components/PaymentDetails';
import { ShiftDetailsSection } from '../../components/ShiftDetails';
import { QueryType, RequestMethods } from '../../enums';
import { useClientSideRequest } from '../../hooks/useRestClient';
import { Shift } from '../../models';

const ShiftDetails: React.FC = () => {
  const { id } = useParams();
  const [shift, setShift] = useState<Shift | null>(null);

  const { request, loading } = useClientSideRequest({
    method: RequestMethods.SEARCH_SHIFT,
  });

  const fetchShift = async () => {
    if (id) {
      const [shift] = await request({
        type: QueryType.ID,
        values: {
          id,
        },
      });
      setShift(shift || null);
    }
  };

  useEffect(() => {
    fetchShift();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!shift) {
    return <Fallback onRetry={() => fetchShift()} />;
  }

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6 bg-gray-50 rounded-lg shadow-md">
      {/* Patient Information Section */}
      {shift.patientId && <PatientInfoSection id={shift.patientId} />}

      {/* Shift Information Section */}
      <ShiftDetailsSection shift={shift} />

      {/* Payment Information Section */}
      <PaymentDetailsSection payment={shift.payment} />
    </div>
  );
};

export default ShiftDetails;
