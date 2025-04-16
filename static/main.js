// 主畫布與小地圖的 SVG
const mainSvg = d3.select("#main-svg");
const minimapSvg = d3.select("#minimap");
const width = window.innerWidth;
const height = window.innerHeight;

// 從後端載入資料
d3.json("/get_van_gogh_data").then(data => {
    // 計算 x 和 y 的範圍
    const xExtent = d3.extent(data, d => d.x);
    const yExtent = d3.extent(data, d => d.y);

    // 主畫布的縮放比例
    const xScale = d3.scaleLinear()
        .domain(xExtent)
        .range([50, width - 50]); // 留邊距
    const yScale = d3.scaleLinear()
        .domain(yExtent)
        .range([50, height - 50]);

    // 定義縮放行為
    const zoom = d3.zoom()
        .scaleExtent([0.5, 10]) // 縮放範圍
        .on("zoom", zoomed);

    mainSvg.call(zoom);

    // 主畫布的圖片容器
    const g = mainSvg.append("g");

    // 繪製圖片
    g.selectAll("image")
        .data(data)
        .enter()
        .append("image")
        .attr("xlink:href", d => d.image_url)
        .attr("x", d => xScale(d.x) - 15)
        .attr("y", d => yScale(d.y) - 15)
        .attr("width", 30)
        .attr("height", 30)
        .on("click", function(event, d) {
            // 顯示彈出視窗
            d3.select("#popup").style("display", "block");
            // 設置大圖片
            d3.select("#popup-image").attr("src", d.image_url);
            // 設置資訊
            d3.select("#popup-info").text(`Class: ${d.class_name}, Labels: ${d.labels}`);
        });

    // 小地圖的縮放比例
    const minimapScale = 0.15;
    const minimapXScale = d3.scaleLinear()
        .domain(xExtent)
        .range([0, 200 * minimapScale]);
    const minimapYScale = d3.scaleLinear()
        .domain(yExtent)
        .range([0, 150 * minimapScale]);

    // 繪製小地圖的點
    minimapSvg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => minimapXScale(d.x))
        .attr("cy", d => minimapYScale(d.y))
        .attr("r", 2)
        .attr("fill", "#555");

    // 小地圖的視圖框
    const viewRect = minimapSvg.append("rect")
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2);

    // 縮放與平移事件
    function zoomed(event) {
        const transform = event.transform;
        g.attr("transform", transform);

        // 更新小地圖視圖框
        const k = transform.k;
        const tx = transform.x;
        const ty = transform.y;
        viewRect.attr("x", -tx / k * minimapScale)
            .attr("y", -ty / k * minimapScale)
            .attr("width", width / k * minimapScale)
            .attr("height", height / k * minimapScale);
    }

    // 關閉彈出視窗
    d3.select("#close-popup").on("click", function() {
        d3.select("#popup").style("display", "none");
    });
    
}).catch(error => console.error("Error loading data:", error));