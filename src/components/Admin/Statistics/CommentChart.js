import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { monthNames } from "../../../utils/spUtils";
import StatisticsService from '../../../services/statistics.service';
import UserService from '../../../services/user.service';

function CommentChart() {

    const [yearSelected , setYearSelected] = useState();
    const [comment_years, setCommentYears] = useState([]);

    const [chartState,setChartState] = useState({
        labels: monthNames,
        datasets: [{
          label: 'Total User',
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
        
      const [TotalPerYear , setTotalPerYear] = useState(0);
      const [TotalPerYear1 , setTotalPerYear2] = useState(0);

      const totalCommentsPerMonth = (year)=>{  
            if(year)
            {
            var value1 = []
            var totalyear1 = 0;
            StatisticsService.getTotalsCommentsPerMonth(year).then((res)=>{
                let listValue = res.data
               
                listValue.forEach((item)=>{
                  value1.push(item)
                  totalyear1 = totalyear1 + item
            
                })
                setTotalPerYear(totalyear1)
              
            })  
            
            var value2 = []
            var totalyear2 = 0;
            StatisticsService.getTotalsReplyPerMonth(year).then((res)=>{
                let listValue = res.data
               
                listValue.forEach((item)=>{
                  value2.push(item)
                  totalyear2 = totalyear2 + item
            
                })
            setTotalPerYear2(totalyear2)
            })

            setChartState({
                labels: monthNames,
                datasets: [
                {
                  label: 'Total Comment',
                  data: value1,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  stack: 'combined',
                  type: 'bar'
                },
                {
                    label: 'Total Reply',
                    data: value2,
                    borderColor: 'rgb(153, 102, 255)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',                  
                    stack: 'combined',
                    type:'line'
                },
                ],
              
            
              })
           
     
      }}
      
      const fetchYearComment = async () => {
        await UserService.getCommentYear().then(response => {
            // console.log(response.data);
            setCommentYears(response.data);
          })
          .catch(err => {
            console.log(err)
          });
        
      };
     useEffect(()=>{
        totalCommentsPerMonth(new Date().getFullYear())
        fetchYearComment()
     },[])
      
      useEffect(() => {
    
        totalCommentsPerMonth(yearSelected);
    }, [yearSelected]);


  return (
       <div className="card card-success mt-5">
    <div className="card-header">
      <h3 className="card-title">Comments & Reply In {!yearSelected?new Date().getFullYear():yearSelected}</h3>
      <span className="float-right"> Total: {TotalPerYear}</span>
      
   
    </div>
    <div className="ms-4 mt-3">
    <span>Select year: </span>

    <select value={yearSelected} onChange={(e) => setYearSelected(e.target.value)}>
          {comment_years && comment_years.map( 
            (item,index) =>
            
            <option value={item} key={index}> {item}</option>
           )
          }
         
      </select>

    </div>
    <div className="card-body">
      <div className="chart"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className /></div><div className="chartjs-size-monitor-shrink"><div className /></div></div>
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
                        text: 'Total'
                      }
                    },
                    x: {
                        stack:true,
                      title: {
                        display: true,
                        text: 'Month'
                      }
                    }
                  },
                  plugins: {
                    legend: {
                        display: true,
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



export default CommentChart
