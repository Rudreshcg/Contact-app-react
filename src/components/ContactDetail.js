import React, { useLayoutEffect, useRef, useState } from "react";
import { OrgChart } from "d3-org-chart";
import { resData } from "./data";
import { colors } from "@mui/material";

const ContactDetail = () => {
    const d3Container = useRef(null);
    let chart = null;

    const [isExpanded, setIsExpanded] = useState(false);

    useLayoutEffect(() => {
        if (resData && d3Container.current) {
            if (!chart) {
                chart = new OrgChart();
            }
            chart
                .data(resData)
                .childrenMargin((node) => 60)
                .nodeWidth((d) => 250)
                .nodeHeight((d) => 175)
                .buttonContent(({ node, state }) => {
                    return `<div style="color:#2CAAE5;border-radius:5px;padding:3px;font-size:10px;margin:auto auto;background-color:#040910;border: 1px solid #2CAAE5"> <span style="font-size:9px">${node.children
                        ? `<i class="fas fa-angle-up"></i>`
                        : `<i class="fas fa-angle-down"></i>`
                        }</span> ${node.data._totalSubordinates}  </div>`;
                })
                .onNodeClick((d, i, arr) => {
                    console.log(d)
                    createData(d)
                })
                .nodeContent(function (d, i, arr, state) {
                    return `
          <div style="padding-top:30px;background-color:none;margin-left:1px;height:${d.height
                        }px;border-radius:2px;overflow:visible">
            <div style="height:${d.height - 72
                        }px;padding-top:0px;background-color:#1c1b1b;border:1px solid #1c1b1b; display: flex;">
            <div style="align-self: center;">
            <img src=" ${d.data.imageUrl}" alt="${d.data.name}" 
            style="color:whitesmoke; font-size:10px;padding: 5px; border-radius:100px;width:60px;height:60px;" />
            </div>
             <div style="padding:20px; text-align:center;">
                 <div style="color:whitesmoke;font-size:16px;font-weight:bold"> ${d.data.name
                        } </div>
                 <div style="color:whitesmoke;font-size:12px;margin-top:4px"> ${d.data.positionName
                        } </div>
                <div style="color:whitesmoke;font-size:12px;margin-top:4px">ID:${d.data.id}</div>
             </div> 
             <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;"> 
             </div>
            </div>     
    </div>
`;

                })
                .render();
        }

    }, [resData, d3Container.current, isExpanded]);

    const toggleExpandCollapse = () => {
        if (chart) {
            if (isExpanded) {
                chart.collapseAll();
            }
            else {
                chart.expandAll();
            }
        }
        setIsExpanded(!isExpanded);

    };

    const createData = (d) => {
        resData.push(
            {
                positionName: "607a97662a3b0c8607a97662",
                id: "yh77855877",
                parentId: d,
                tags: "OLTIN-DIREKTOR",
                name: "Axmadjon",
                area: "OLTIN-DIREKTOR",
                imageUrl:
                    "https://cdn.britannica.com/s:250x250,c:crop/05/156805-050-4B632781/Leonardo-DiCaprio-2010.jpg",
                isLoggedUser: true
            },
        )
    }

    return (
        <div>
            <div style={{ float: "right", }}>
                <button onClick={toggleExpandCollapse} style={{
                    background: "#1c1b1b", color: "whitesmoke",
                    fontSize: "15px", fontWeight: "bold", padding: "4px", borderRadius: "10px"
                }}>
                    {isExpanded ? "Collapse All" : "Expend All"}
                </button>
            </div>
            <div ref={d3Container}>
            </div>
        </div>
    );
};

export default ContactDetail;
























































// import React, { useEffect } from "react";
// import OrgChart from "orgchart.js";
// import "orgchart.js/src/orgchart.css";
// // import { OrgChart } from 'd3-org-chart';

// const ContactDetail = () => {
//     const ds = {
//         id: "n1",
//         name: "Ragulan",
//         title: "general manager",
//         children: [
//             { id: "n2", name: "Bo Miao", title: "department manager", test: "je" },
//             {
//                 id: "n3",
//                 name: "Su Miao",
//                 title: "department manager",
//                 children: [
//                     { id: "n4", name: "Tie Hua", title: "senior engineer" },
//                     {
//                         id: "n5",
//                         name: "Hei Hei",
//                         title: "senior engineer",
//                         children: [
//                             { id: "n6", name: "Dan Dan", title: "engineer" },
//                             { id: "n7", name: "Xiang Xiang", title: "engineer" }
//                         ]
//                     },
//                     { id: "n8", name: "Pang Pang", title: "senior engineer" }
//                 ]
//             },
//             { id: "n9", name: "Hong Miao", title: "department manager" },
//             {
//                 id: "n10",
//                 name: "Chun Miao",
//                 title: "department manager",
//                 children: [{ id: "n11", name: "Yue Yue", title: "senior engineer" }]
//             }
//         ]
//     };
//     useEffect(() => {
//         new OrgChart({
//             chartContainer: "#chart-container",
//             data: ds,
//             nodeContent: "title",
//             parentNodeSymbol: "https://png.pngtree.com/png-clipart/20190515/original/pngtree-instagram-social-media-icon-png-image_3572487.jpg",
//             pan: true,
//             nodeTemplate: (data) =>
//                 `<div class="title"><span>${data.id}</span></div><div class="content"><span>${data.id}</span></div>`
//         });
//     });
//     return <div id="chart-container" />;
// };


// export default ContactDetail

