import api from "../../api/axiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    Grid,
} from "@mui/material";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password } = form;

        if (!username || !password) {
            return setError("Vui lòng nhập đầy đủ thông tin.");
        }

        setError("");
        try {
            const res = await api.post('/auth/login', form);
            if (res.data?.success) {
                localStorage.setItem('token', res.data.data.token);
                alert(res.data.message || "Đăng nhập thành công!");
                navigate('/');
            } else {
                setError(res.data?.message || "Đăng nhậ thất bại.");
            }
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
            setError(error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
    };

    const handleNavigate = () => navigate("/register");

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Đăng nhập
                </Typography>

                {error && (
                    <Typography
                        color="error"
                        align="center"
                        sx={{ mb: 2, fontSize: 14 }}
                    >
                        {error}
                    </Typography>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Tên đăng nhập"
                                name="username"
                                fullWidth
                                value={form.username}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Mật khẩu"
                                name="password"
                                type="password"
                                fullWidth
                                value={form.password}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                    >
                        Đăng nhập
                    </Button>

                    <Typography
                        variant="body2"
                        align="center"
                        sx={{ mt: 2, cursor: "pointer" }}
                        onClick={handleNavigate}
                    >
                        Chưa có tài khoản? <b>Đăng ký ngay</b>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;