import { useEffect, useState } from 'react';
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useGetProducts } from '../api/hooks/useGetProducts';
import { Product } from '../api/types';

const TableData = () => {
    const { getProducts } = useGetProducts();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  const handleGetProducts = async () => {
    try {
      const products = await getProducts();
      setProducts(products);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const rows = products.map((product: Product) => (
    {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category.name,
    }
  ));
  return (
    <Container fixed>
        <h1>Products</h1>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Titulo</TableCell>
            <TableCell align="center">Precio</TableCell>
            <TableCell align="center">Descripcion(g)</TableCell>
            <TableCell align="center">Categoria</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        <Button variant="contained" color="primary" onClick={handleGetProducts}>
          Button
        </Button>
      </Container>
  )
}

export default TableData;