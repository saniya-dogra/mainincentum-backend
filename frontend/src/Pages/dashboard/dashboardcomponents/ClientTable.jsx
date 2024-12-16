import React from "react";

const ClientTable = () => {
  const clients = Array(8).fill({
    firstName: "Aimee",
    lastName: "Liu",
    applicationNo: "21001",
    email: "username@gmail.com",
    contact: "6479499492",
    username: "Aimee000",
    status: "In Process",
  });

  return (
    <div className="mt-6 px-6">
      <div className="bg-white rounded-md shadow-md p-4">
        <h2 className="text-lg font-bold mb-4">Clients Application</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              {["Profile", "First Name", "Last Name", "Application No", "Email", "Contact", "Username", "Status"].map(
                (head, idx) => (
                  <th key={idx} className="py-2 px-4 text-gray-600">
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {clients.map((client, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">🧑</td>
                <td className="py-2 px-4">{client.firstName}</td>
                <td className="py-2 px-4">{client.lastName}</td>
                <td className="py-2 px-4">{client.applicationNo}</td>
                <td className="py-2 px-4">{client.email}</td>
                <td className="py-2 px-4">{client.contact}</td>
                <td className="py-2 px-4">{client.username}</td>
                <td className="py-2 px-4">{client.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientTable;
