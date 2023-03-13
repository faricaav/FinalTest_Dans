import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUsers, retrieveUsers } from "../features/users";
import { useCallback, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare,faPlus } from "@fortawesome/free-solid-svg-icons"

export default function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);

  const removeUsers = (id_user) => {
    if(window.confirm("Apakah yakin untuk menghapus?")){
      dispatch(deleteUsers({ id_user }))
        .unwrap()
        .then(() => {
          navigate("/users");
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const initFetch = useCallback(() => {
    dispatch(retrieveUsers());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])
  
  return (
    <div
      className="container mt-5 mx-auto"
    >
      <b>
        <h4 align="left" className="text-xl">List Users</h4>
      </b>
      <br />
      {/* generate list */}
      <br />
      <br /> 
      <ul className="list-group " >
        <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
            <tr className='fw-bold text-muted' align="center">
                <th className='min-w-50px'>No</th>
                <th className='min-w-140px'>Name</th>
                <th className='min-w-140px'>Email</th>
                <th className='min-w-120px'>Role</th>
                <th className='min-w-80px'>Actions</th>
            </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody align="center">
            {users.map((item, index) => {
              return (
                <tr align="center" key={index} data-testid="list-user">
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                  <Link to={`/updateUsers/${item.id_user}`}>
                      <button
                        className="btn btn-primary mx-1"
                        size="small"
                      >
                        <FontAwesomeIcon icon={faPenToSquare}/>
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={async() => {
                        await dispatch(removeUsers(item.id_user));
                      }}
                      size="small"
                    >
                      <FontAwesomeIcon icon={faTrash}/>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </ul>
    </div>
  );
}
