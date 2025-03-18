import React from 'react';
import { useSelector } from 'react-redux';
function AdminDashboard() {

  return (
    <div>
      <h1 className="border-b p-5 text-2xl font-bold" >Welcome, Admin!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <div className="border p-2 font-semibold">
          <h3>Active Users</h3>
          <p>23</p>
        </div>
        <div className="border p-2 font-semibold shadow">
          <h3>All Users</h3>
          <p>21</p>
        </div>
        <div className="border p-2 font-semibold shadow ">
          <h3>Blocked Users</h3>
          <p>4</p>
        </div>
        <div className="border p-2 font-semibold shadow">
          <h3>Messages</h3>
          <p>5</p>
        </div>
        <div className="border p-2 font-semibold shadow">
          <h3>Settings</h3>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;