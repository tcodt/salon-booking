// src/components/AclForm.tsx
import { useState, useEffect } from "react";
import { useGetAclById } from "../../hooks/acl/useGetAclById";
import { useAddAcl } from "../../hooks/acl/useAddAcl";
import { useUpdateAcl } from "../../hooks/acl/useUpdateAcl";
import { CreateAclRequest } from "../../types/acl";

interface AclFormProps {
  id?: number;
  onClose: () => void;
}

const AclForm = ({ id, onClose }: AclFormProps) => {
  const isEdit = !!id;
  const { data: acl, isLoading } = useGetAclById(id!);
  const createAcl = useAddAcl();
  const updateAcl = useUpdateAcl();

  const [userId, setUserId] = useState(0);
  const [permissions, setPermissions] = useState<number[]>([]);

  useEffect(() => {
    if (isEdit && acl) {
      setUserId(Number(acl.user));
      setPermissions(acl.permissions);
    }
  }, [acl, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: CreateAclRequest = { user: userId, permissions };
    if (isEdit) {
      updateAcl.mutate({ user: id!, permissions });
    } else {
      createAcl.mutate(data);
    }
    onClose();
  };

  if (isEdit && isLoading) return <div>در حال بارگذاری...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>شناسه کاربر:</label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          placeholder="شناسه کاربر"
        />
      </div>
      <div>
        <label>مجوزها:</label>
        <input
          type="text"
          value={permissions.join(",")}
          onChange={(e) =>
            setPermissions(e.target.value.split(",").map(Number))
          }
          placeholder="مثال: 1,2,3"
        />
      </div>
      <button type="submit">{isEdit ? "به‌روزرسانی" : "ساخت"}</button>
      <button type="button" onClick={onClose}>
        بستن
      </button>
    </form>
  );
};

export default AclForm;
