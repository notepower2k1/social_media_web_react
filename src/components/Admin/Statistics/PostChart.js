import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { monthNames } from "../../../utils/spUtils";
import StatisticsService from '../../../services/statistics.service';
import PostService from "../../../services/post.service";

function PostChart() {

    const [yearSelected , setYearSelected] = useState();
    const [published_years, setPublishedYears] = useState([]);

    const [chartState,setChartState] = useState({
        labels: monthNames,
        datasets: [{
          label: 'Total Post',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      })
        
      const fetchYearPublished = async () => {
        await PostService.getYearByPost().then(response => {
            // console.log(response.data);
            setPublishedYears(response.data);
          })
          .catch(err => {
            console.log(err)
          });
        
      };

      const [TotalPostPerYear , setTotalPostPerYear] = useState(0);
    
      const totalPostsPerMonth = (year)=>{  
            if(year)
            {
              StatisticsService.getTotalsPostsPerMonth(year).then((res)=>{
                let listValue = res.data
                var value = []
                var totalyear = 0;
                listValue.forEach((item)=>{
                  value.push(item)
                  totalyear = totalyear + item
            
                })
                setTotalPostPerYear(totalyear)
                setChartState({
                labels: monthNames,
                datasets: [{
                  label: 'Total Post',
                  data: value,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
                  borderWidth: 1
                }]
              })
            })   
            }
     
      }
      
    
     useEffect(()=>{
        totalPostsPerMonth(new Date().getFullYear())
        fetchYearPublished()
     },[])
      
      useEffect(() => {
    
        totalPostsPerMonth(yearSelected);
    }, [yearSelected]);


  return (
<div className="card card-success mt-5">
    <div className="card-header">
      <h3 className="card-title">Posts published In {!yearSelected?new Date().getFullYear():yearSelected}</h3>
      <span className="float-right"> Total: {TotalPostPerYear}</span>

      
    
    </div>
    <div className="ms-4 mt-3">
    <span>Select year: </span>

    <select value={yearSelected} onChange={(e) => setYearSelected(e.target.value)}>
          {published_years && published_years.map( 
            (item,index) =>
            
            <option value={item} key={index}> {item}</option>
           )
          }
         
      </select>

    </div>
 
    <div className="card-body">
      <div className="chart"><div className="chartjs-size-monitor">
        <div className="chartjs-size-monitor-expand"><div className /></div>
        <div className="chartjs-size-monitor-shrink"><div className /></div></div>
        <ul className='col-12'>
              {/* Đổi thành BarChart, LineChart, PieChart, DoughnutChart tuỳ ý
              {/* Thêm thẻ ul để hiển thị nhiều Chart */}
              {/* col-..., mt-..., me-..., ... */}
          <Bar
              
                height={300}
                data = {chartState}
                options = {{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      stepValue: 1,
                      title: {
                        display: true,
                        text: 'Total Post'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Month'
                      }
                    }
                  },
                  plugins: {
                    legend: {
                        display: false,
                        labels: {
                            color: 'rgb(255, 99, 132)'
                        }
                    }
                }
                }}
            />
      </ul>
      </div>
    </div>
    {/* /.card-body */}
    </div>
    
  )
}



export default PostChart
