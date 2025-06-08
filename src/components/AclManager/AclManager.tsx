import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useGetAcl } from "../../hooks/acl/useGetAcl";
import Loading from "../Loading/Loading";
import AclForm from "../AclForm/AclForm";
import { Link } from "react-router";

const AclManager: React.FC = () => {
  const { user, acl } = useAuth();
  const { data: aclList, isLoading, error } = useGetAcl(user ? user?.id : 0);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  console.log(aclList);

  if (!user) return <div>لطفاً وارد شوید</div>;

  if (isLoading) return <Loading />;
  if (error) return <div>خطا: {error.message}</div>;

  console.log(acl);

  return (
    <div className="p-4">
      <Link to="/home" className="bg-slate-400 text-white py-2 px-4 rounded-xl">
        برگشت
      </Link>
      <h1>مدیریت ACL</h1>

      <ul>
        {/* {aclList?.map((acl) => (
          <li key={acl.id}>
            {acl.first_name} {acl.last_name} - {acl.phone_number} -{" "}
          </li>
        ))} */}
      </ul>
      {isCreateOpen && <AclForm onClose={() => setIsCreateOpen(false)} />}
      {editId && <AclForm id={editId} onClose={() => setEditId(null)} />}
    </div>
  );
};

export default AclManager;
