import React, { useLayoutEffect, useRef, useEffect } from "react";
import TreeChart from "d3-org-chart";

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  let chart = null;

  function addNode(node) {
    chart.addNode(node);
  }
  template : 
"<div>\n                  <div style=\"margin-left:70px;\n                              margin-top:10px;\n                              font-size:20px;\n                              font-weight:bold;\n                         \">Ian Devling </div>\n                 <div style=\"margin-left:70px;\n                              margin-top:3px;\n                              font-size:16px;\n                         \">Cheaf Executive Officer  </div>\n\n                 <div style=\"margin-left:70px;\n                              margin-top:3px;\n                              font-size:14px;\n                         \">Business first</div>\n\n                 <div style=\"margin-left:196px;\n                             margin-top:15px;\n                             font-size:13px;\n                             position:absolute;\n                             bottom:5px;\n                            \">\n                      <div>CTO office</div>\n                      <div style=\"margin-top:5px\">Corporate</div>\n                 </div>\n              </div>"

  props.setClick(addNode);

  // We need to manipulate DOM
  useLayoutEffect(() => {
    console.log("d3Container.current", d3Container.current);
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new TreeChart();
      }
      chart
        .container(d3Container.current)
        .data(props.data)
        .svgWidth(500)
        .initialZoom(0.4)
        .onNodeClick((d) => {
          console.log(d + " node clicked");
          console.log("props", Object.keys(props), d);
          props.onNodeClick(d);
        })
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};
