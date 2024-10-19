import { Table, TableBody, TableCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Alluser(props) {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState({});
  const apiUrl =
    import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
  useEffect(() => {
    const laodposts = async () => {
      const accessToken = "access_token";
      try {
        const res = await fetch(`${apiUrl}/api/user/alluser`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials (cookies) for cross-origin requests
        });
        const data = await res.json();
        setUsers(data.users);
        console.log(users);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    laodposts();
  }, []);

  return (
    <div className=" table-auto overflow-x-scroll md:mx-auto p-5">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Updated Date</Table.HeadCell>
              <Table.HeadCell>User Id</Table.HeadCell>
              <Table.HeadCell>User Email</Table.HeadCell>
              <Table.HeadCell>Profile Picture</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            {users.map((post) => (
              <TableBody key={post._id}>
                <TableRow>
                  <TableCell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{post._id}</TableCell>
                  <TableCell>{post.email}</TableCell>
                  <TableCell>
                    <img src={post.profilePicture}></img>
                  </TableCell>
                  <TableCell>
                    <span className="text-red-600 hover:underline cursor-pointer">
                      Delete
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-red-600 hover:underline cursor-pointer">
                      Edit
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </>
      ) : (
        <p> there is no post</p>
      )}
    </div>
  );
}

export default Alluser;
