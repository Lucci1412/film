import { toast } from "react-toastify";
export const typeMovies=[
    {
        path:'/hoat-hinh',
        origin:'hoathinh'
    },
    {
        path:'/phim-bo',
        origin:'series'
    },
    {
        path:'/phim-le',
        origin:'single'
    },
    {
        path:'/game-show',
        origin:'tvshows'
    },
]


export const countryMovies=[
    { "path": "anh", "origin": "Anh" },
    { "path": "trung-quoc", "origin": "Trung Quốc" },
    { "path": "quoc-gia-khac", "origin": "Quốc Gia Khác" },
    { "path": "han-quoc", "origin": "Hàn Quốc" },
    { "path": "hong-kong", "origin": "Hồng Kông" },
    { "path": "au-my", "origin": "Âu Mỹ" },
    { "path": "duc", "origin": "Đức" },
    { "path": "phap", "origin": "Pháp" },
    { "path": "tho-nhi-ky", "origin": "Thổ Nhĩ Kỳ" },
    { "path": "nhat-ban", "origin": "Nhật Bản" },
    { "path": "mexico", "origin": "Mexico" },
    { "path": "nga", "origin": "Nga" },
    { "path": "thai-lan", "origin": "Thái Lan" },
    { "path": "canada", "origin": "Canada" },
    { "path": "tay-ba-nha", "origin": "Tây Ban Nha" },
    { "path": "ireland", "origin": "Ireland" },
    { "path": "malaysia", "origin": "Malaysia" },
    { "path": "uc", "origin": "Úc" },
    { "path": "an-do", "origin": "Ấn Độ" },
    { "path": "chau-phi", "origin": "Châu Phi" },
    { "path": "ukraina", "origin": "Ukraina" },
    { "path": "dai-loan", "origin": "Đài Loan" },
    { "path": "philippines", "origin": "Philippines" },
    { "path": "a-rap-xe-ut", "origin": "Ả Rập Xê Út" },
    { "path": "brazil", "origin": "Brazil" },
    { "path": "y", "origin": "Ý" },
    { "path": "uae", "origin": "UAE" },
    { "path": "ba-lan", "origin": "Ba lan" },
    { "path": "dan-mach", "origin": "Đan Mạch" },
    { "path": "ha-lan", "origin": "Hà Lan" },
    { "path": "nam-phi", "origin": "Nam Phi" },
    { "path": "na-uy", "origin": "Na Uy" },
    { "path": "thuy-dien", "origin": "Thụy Điển" },
    { "path": "indonesia", "origin": "Indonesia" },
    { "path": "bo-dao-nha", "origin": "Bồ Đào Nha" },
    { "path": "thuy-si", "origin": "Thụy Sĩ" },
    { "path": "bi", "origin": "Bỉ" },
    { "path": "colombia", "origin": "Colombia" }
  ]

  
  export const categoryMovies=[
    { "path": "gia-dinh", "origin": "Gia Đình" },
    { "path": "hai-huoc", "origin": "Hài Hước" },
    { "path": "phieu-luu", "origin": "Phiêu Lưu" },
    { "path": "bi-an", "origin": "Bí ẩn" },
    { "path": "phim-18+", "origin": "Phim 18+" },
    { "path": "tam-li", "origin": "Tâm Lý" },
    { "path": "hinh-su", "origin": "Hình Sự" },
    { "path": "tinh-cam", "origin": "Tình Cảm" },
    { "path": "tai-lieu", "origin": "Tài Liệu" },
    { "path": "kinh-di", "origin": "Kinh Dị" },
    { "path": "chinh-kich", "origin": "Chính kịch" },
    { "path": "co-trang", "origin": "Cổ Trang" },
    { "path": "hanh-dong", "origin": "Hành Động" },
    { "path": "chien-tranh", "origin": "Chiến Tranh" },
    { "path": "khoa-hoc", "origin": "Khoa Học" },
    { "path": "vien-tuong", "origin": "Viễn Tưởng" },
    { "path": "hoc-duong", "origin": "Học Đường" },
    { "path": "vo-thuat", "origin": "Võ Thuật" },
    { "path": "the-thao", "origin": "Thể Thao" },
    { "path": "am-nhac", "origin": "Âm Nhạc" },
    { "path": "kinh-dien", "origin": "Kinh Điển" },
    { "path": "than-thoai", "origin": "Thần Thoại" }
  ]
  

  export const messageSuccess = (text) =>
  toast.success(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme:"colored"
  });

export const messageFail = (text) =>
  toast.error(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme:"colored" 
  });
  export const messageInfo = (text) =>
  toast.info(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme:"colored"
  });