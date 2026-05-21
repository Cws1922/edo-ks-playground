import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import AdsDashboard from '@/pages/AdsDashboard';
import AdsCampaign from '@/pages/AdsCampaign';
import NotFoundPage from '@/pages/NotFound';
import TransactionsIndex from '@/pages/TransactionsIndex';
import TransactionsD1 from '@/pages/TransactionsD1';
import TransactionsD2 from '@/pages/TransactionsD2';
import TransactionsD3 from '@/pages/TransactionsD3';
import P1ManagePortfoliosPage from '@/pages/payment/P1ManagePortfoliosPage';
import P2PaymentManagementPage from '@/pages/payment/P2PaymentManagementPage';
import P3PaymentManagementPage from '@/pages/payment/P3PaymentManagementPage';
import P4PaymentPage from '@/pages/payment/P4PaymentPage';
import P5ManagePortfoliosPage from '@/pages/payment/P5ManagePortfoliosPage';
import { installKeystoneOverlayCompat } from '@/infra/keystoneOverlayCompat';

if (import.meta.env.DEV) {
  installKeystoneOverlayCompat();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<AdsDashboard />} />
          <Route path="campaigns" element={<AdsCampaign />} />
          <Route path="transactions" element={<TransactionsIndex />} />
          <Route path="transactions/d1" element={<TransactionsD1 />} />
          <Route path="transactions/d2" element={<TransactionsD2 />} />
          <Route path="transactions/d3" element={<TransactionsD3 />} />
          <Route path="payment/p1" element={<P1ManagePortfoliosPage />} />
          <Route path="payment/p2" element={<P2PaymentManagementPage />} />
          <Route path="payment/p3" element={<P3PaymentManagementPage />} />
          <Route path="payment/p4" element={<P4PaymentPage />} />
          <Route path="payment/p5" element={<P5ManagePortfoliosPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
