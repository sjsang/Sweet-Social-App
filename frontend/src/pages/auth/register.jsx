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

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, username, email, password, confirmPassword } = form;

        if (!name || !username || !email || !password || !confirmPassword) {
            return setError("Vui lòng điền đầy đủ thông tin.");
        }

        if (password !== confirmPassword) {
            return setError("Mật khẩu nhập lại không khớp.");
        }

        setError("");
        try {
            const res = await api.post('/auth/register', { name, username, email, password });
            if (res.data?.success) {
                alert(res.data.message || "Đăng ký thành công!");
                navigate('/login');
            } else {
                setError(res.data?.message || "Đăng ký thất bại.");
            }
        } catch (error) {
            console.error("Lỗi khi đăng ký:", error);
            setError(error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
    };

    const handleNavigate = () => navigate("/login");

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Đăng ký tài khoản
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
                                label="Họ và tên"
                                name="name"
                                fullWidth
                                value={form.name}
                                onChange={handleChange}
                            />
                        </Grid>
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
                                label="Email"
                                name="email"
                                type="email"
                                fullWidth
                                value={form.email}
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
                        <Grid item xs={12}>
                            <TextField
                                label="Nhập lại mật khẩu"
                                name="confirmPassword"
                                type="password"
                                fullWidth
                                value={form.confirmPassword}
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
                        Đăng ký
                    </Button>

                    <Typography
                        variant="body2"
                        align="center"
                        sx={{ mt: 2, cursor: "pointer" }}
                        onClick={handleNavigate}
                    >
                        Đã có tài khoản? <b>Đăng nhập ngay</b>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
