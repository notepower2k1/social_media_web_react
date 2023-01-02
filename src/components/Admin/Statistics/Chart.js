import React, { useEffect, useState } from 'react';
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js';
// eslint-disable-next-line no-unused-vars
import {Bar, Doughnut, Pie, Line} from 'react-chartjs-2';

import "../../../App.css";
import UserService from "../../../services/user.service";
import PostService from "../../../services/post.service";
import GroupService from "../../../services/group.service";

// Import hết luôn tránh bị lỗi lúc chuyển Chart
import "chart.js/auto";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const Chart = () => {

    // Để phân biệt các Chart tránh đè dữ liệu lên nhau
    const [chartUser, setChartUser] = useState([]);

    const [users, setUsers] = useState([]);
    const [registered_years, setRegisteredYears] = useState([]);
    const [registered_months, setRegisteredMonths] = useState([]);
    const [totalUserYear, setTotalUserYear] = useState([]);
    const [totalUserMonth, setTotalUserMonth] = useState([]);
    const [selectedYearRegister, setSelectedYearRegister] = useState(2020);

    const [posts, setPosts] = useState([]);
    const [published_years, setPublishedYears] = useState([]);
    const [published_months, setPublishedMonths] = useState([]);
    const [totalPostYear, setTotalPostYear] = useState([]);
    const [totalPostMonth, setTotalPostMonth] = useState([]);
    const [selectedYearPublished, setSelectedYearPublished] = useState(2020);

    const [listRegisteredYears, setListRegisteredYears] = useState([]);
    const [listPublishedYears, setListPublishedYears] = useState([]);
    
    const [groups, setGroups] = useState([]);


    var totalUserByYear =  {
    //  labels: chartUser.map(x => x.registeredDate), // Map để lấy dữ liệu cần hiển thị lên Chart
    //  labels: chartUser.map(x => x.username),
      labels: registered_years,
      datasets: [
      {
        label: 'Total User Register By Year',
     //  data: chartUser.map(x => x.id),
        data: totalUserYear,
        borderWidth: 1,
        backgroundColor: [
          // Dựa theo thứ tự màu ở trên đổi lại cho đẹp
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
      },
  ]
  }

  var totalUserByMonth =  {
      labels: registered_months,
      datasets: [
      {
        label: 'Total User Register By Month',
        data: totalUserMonth,
        borderWidth: 1,
        backgroundColor: [
          // Dựa theo thứ tự màu ở trên đổi lại cho đẹp
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
      },
  ]
  }

  var totalPostByYear =  {
      labels: published_years,
      datasets: [
      {
        label: 'Total Post Published By Year',
        data: totalPostYear,
        borderWidth: 1,
        backgroundColor: [
          // Dựa theo thứ tự màu ở trên đổi lại cho đẹp
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
      },
  ]
  }

  var totalPostByMonth =  {
      labels: published_months,
      datasets: [
      {
        label: 'Total Post Published By Month',
        data: totalPostMonth,
        borderWidth: 1,
        backgroundColor: [
          // Dựa theo thứ tự màu ở trên đổi lại cho đẹp
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
      },
  ]
  }


    var options = {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        legend: {
            labels: {
                fontSize: 26
            }
        }
    }

    const fetchYearRegister = async () => {
      await UserService.getYearByUser().then(response => {
          // console.log(response.data);
          setRegisteredYears(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const countUserByYear = async () => {
      await UserService.countUserByYear().then(response => {
          // console.log(response.data)
          setTotalUserYear(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const fetchMonthRegister = async (year) => {
      await UserService.getMonthByUser(year=selectedYearRegister).then(response => {
          // console.log(response.data)
          setRegisteredMonths(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const countUserByMonth = async (year) => {
      await UserService.countUserByMonth(year=selectedYearRegister).then(response => {
          // console.log(response.data);
          setTotalUserMonth(response.data);
          
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const fetchUser = async () => {
      await UserService.getAllUsers().then(response => {
          // console.log(response.data)
          setChartUser(response.data);
          setUsers(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const fetchYearPublished = async () => {
      await PostService.getYearByPost().then(response => {
          // console.log(response.data);
          setPublishedYears(response.data);
          
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const countPostByYear = async () => {
      await PostService.countPostByYear().then(response => {
          // console.log(response.data)
          setTotalPostYear(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const fetchMonthPublished = async (year) => {
      await PostService.getMonthByPost(year=selectedYearPublished).then(response => {
          // console.log(response.data)
          setPublishedMonths(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const countPostByMonth = async (year) => {
      await PostService.countPostByMonth(year=selectedYearPublished).then(response => {
          // console.log(response.data);
          setTotalPostMonth(response.data);
          
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const fetchPost = async () => {
      await PostService.readAllPosts().then(response => {
          // console.log(response.data)
          setPosts(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };

    const fetchGroup = async () => {
      await GroupService.readAllGroups().then(response => {
          // console.log(response.data)
          setGroups(response.data);
        })
        .catch(err => {
          console.log(err)
        });
      
    };
  
    useEffect(() => {
      fetchUser();
      fetchYearRegister();
      countUserByYear();
      fetchMonthRegister();
      countUserByMonth();

      fetchPost();
      fetchYearPublished();
      countPostByYear();
      fetchMonthPublished();
      countPostByMonth();
      fetchGroup();
      
    }, [selectedYearRegister, selectedYearPublished]);
  // Render lại khi selectedYear thay đổi

  return (
    // Grid
    <div className='row'>
        <div>
          Total User: {users.length}
          <br></br>
          Total Post: {posts.length}
          <br></br>
          Total Group: {groups.length}
          
        </div>
    {/* Đổi thành BarChart, LineChart, PieChart, DoughnutChart tuỳ ý
    {/* Thêm thẻ ul để hiển thị nhiều Chart */}
    {/* col-..., mt-..., me-..., ... */}
       <ul className='col-12'>
        <Bar
              height = {400}
              data = {totalUserByYear}
              options = {options}
          />
       </ul>

       <ul className='col-12'>
        <Bar
              height = {400}
              data = {totalUserByMonth}
              options = {options}
          />
       </ul>
      <ul>


      {/* <select value={selectedYearRegister} onChange={(event) => setSelectedYearRegister(event.target.value)}>
                <option value={2020}>2020</option>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
      </select> */}

      <select value={selectedYearRegister} onChange={(e) => setSelectedYearRegister(e.target.value)}>
                {registered_years && registered_years.map( 
                  (item) =>
                  
                  <option value={item}> {item}</option>
                 )
                }
               
        </select>

      </ul>
       <ul className='col-12'>
       <Bar
              height = {400}
              data = {totalPostByYear}
              options = {options}
          />
       </ul>

       <ul className='col-12'>
       <Bar
              height = {400}
              data = {totalPostByMonth}
              options = {options}
          />
       </ul>

      {/* <select value={selectedYearPublished} onChange={(event) => setSelectedYearPublished(event.target.value)}>
                <option value={2020}>2020</option>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
      </select> */}

     <div>
     <select value={selectedYearPublished} onChange={(e) => setSelectedYearPublished(e.target.value)}>
                {published_years && published_years.map( 
                  (item) =>
                  
                  <option value={item}> {item}</option>
                 )
                }
               
        </select>
     </div>

       <ul className='col-6'>
       <Pie
              height = {400}
              data = {totalUserByYear}
              options = {options}
          />
       </ul>

       <ul className='col-6'>
       <Doughnut
              height = {400}
              data = {totalUserByYear}
              options = {options}
          />
       </ul>
    </div>
    
  )
}

export default Chart