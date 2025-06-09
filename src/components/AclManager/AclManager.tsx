import React, { useState } from "react";
import AclForm from "../AclForm/AclForm";
import { Link } from "react-router";

const AclManager: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

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
