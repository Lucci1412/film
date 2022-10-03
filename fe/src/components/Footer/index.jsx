import React from "react";
import { Email,Facebook } from "@mui/icons-material";
import "./style.scss";
function Footer() {
  return (
    <div className="footer">
      <div className="container ">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
            <div className="footer-item">
              <h4>NGHIỆN PHIM</h4>
              <span>
                nghiện phim là nơi tổng hợp phim hot nhất hiện nay với số lượng lên
                đến hơn 10000+
              </span>
            </div>
          </div>
          <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
            <div className="footer-item">
              <h4>Thông tin</h4>
              <span>
                Tất cả nội dung của trang web này được thu thập từ các trang web
                video chính thống trên Internet, và không cung cấp phát trực
                tuyến chính hãng. Nếu quyền lợi của bạn bị vi phạm, vui lòng
                thông báo cho chúng tôi, chúng tôi sẽ xóa nội dung vi phạm kịp
                thời, cảm ơn sự hợp tác của bạn!
              </span>
            </div>
          </div>
          <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
            <div className="footer-item ">
              <h4>Liên hệ</h4>
              <a href="https://www.facebook.com/gigijdang" className="footer-link">
                <Facebook></Facebook>
                <span>Facebook</span>
              </a>
              <div className="footer-link">
                <Email />
                <span>cubebaothu@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
