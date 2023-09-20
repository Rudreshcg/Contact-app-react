import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { OrgChart } from "d3-org-chart";
import { Button, Modal, TextField } from "@mui/material";
import { resDatas } from "./data"
import axios from 'axios';
import * as d3 from "d3"

const { v4: uuidv4 } = require('uuid');


const ContactDetail = () => {
    const d3Container = useRef(null);
    let chart = null;

    const [isExpanded, setIsExpanded] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [resData, setResData] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', manager: '', department: '', title: '', parentId: '', nodeId: '' })

    useEffect(() => {
        axios
            .get("http://localhost:1880/getData/")
            .then((response) => {
                setResData(response.data);
                console.log(response);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [])

    useEffect(() => {

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
                    setIsFormVisible(true);
                    setFormData({ formData, manager: d.data.name.toString(), parentId: d.data.nodeId })
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
            d3.select('.svg-chart-container')
                .style("background-color", '#4c4a4a')

            d3.selectAll('path')
                .style("stroke", "white")

        }

        console.log("hello im useEffet")

    }, [resData, d3Container.current, isExpanded, isFormVisible, formData]);


    const toggleExpandCollapse = () => {
        if (chart) {
            if (isExpanded) {
                chart.collapseAll().fit();
                chart.setCentered("79ff83a3-e662-483d-9f58-5eb69fa2bee2")
            }
            else {
                chart.expandAll().fit();
            }
        }
        setIsExpanded(!isExpanded);

    };


    let newData = {
        "name": formData.name,
        "managername": formData.manager,
        "department": formData.department,
        "title": formData.title,
        "parentId": formData.parentId,
        "nodeId": uuidv4()
    }

    // const addData = () => {
    //     let newData = [{
    //         "name": formData.name,
    //         "managername": formData.manager,
    //         "department": formData.department,
    //         "title": formData.title
    //     }]



    //     console.log(newData)

    // }
    const addData = async () => {

        try {
            const response = await fetch('http://localhost:1880/addData/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });

            if (response.ok) {
                setResData((prev) => {
                    prev.push({
                        "name": formData.name,
                        "managername": formData.manager,
                        "department": formData.department,
                        "title": formData.title,
                        "parentId": formData.parentId,
                        "nodeId": uuidv4(),
                        _expanded: true,
                        _centered: true,
                    });
                    return [...prev];
                });
                const data = await response.json();
                console.log('Data from API:', data);
            } else {
                console.error('Request failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        // window.location.reload()
    };


    return (
        <div>
            <div>

                <Button
                    variant="contained"
                    onClick={toggleExpandCollapse}
                    className="buttonContainer"
                    style={{ float: "right" }}
                >
                    {isExpanded ? "Collapse All" : "Expand All"}
                </Button>
            </div>

            <Modal
                open={isFormVisible}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onClose={() => setIsFormVisible(false)}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        height: 450,
                        width: 350,
                        backgroundColor: "#FFF",
                    }}
                >
                    <div>

                    </div>
                    <TextField style={{ margin: "10px" }} label={'Name'} required type="text" value={formData?.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    <TextField style={{ margin: "10px" }} label={'Email'} required type="email" value={formData?.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    <TextField style={{ margin: "10px" }} label={'Department'} required type="department" value={formData?.department} onChange={e => setFormData({ ...formData, department: e.target.value })} />
                    <TextField style={{ margin: "10px" }} label={'title'} required type="title" value={formData?.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    <TextField style={{ margin: "10px" }} label={'Manager name'} type="text" value={formData?.manager} disabled={true} />
                    <Button style={{ marginTop: 15 }} variant="contained" onClick={() => {
                        setIsFormVisible(false)
                        addData()
                    }}>
                        ADD
                    </Button>
                </div>
            </Modal>
            <div ref={d3Container}></div>
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

