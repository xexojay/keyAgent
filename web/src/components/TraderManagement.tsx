import { useState } from 'react';
import { api } from '../lib/api';
import { t, type Language } from '../i18n/translations';

interface TraderManagementProps {
  language: Language;
}

export function TraderManagement({ language }: TraderManagementProps) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    enabled: true,
    ai_model: 'deepseek',
    exchange: 'hyperliquid',
    hyperliquid_private_key: '',
    hyperliquid_wallet_addr: '',
    hyperliquid_testnet: false,
    binance_api_key: '',
    binance_secret_key: '',
    deepseek_key: '',
    qwen_key: '',
    custom_api_url: '',
    custom_api_key: '',
    custom_model_name: '',
    initial_balance: 50,
    scan_interval_minutes: 3,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await api.addTrader(formData);
      setMessage({
        type: 'success',
        text: result.message,
      });
      // 重置表单
      setFormData({
        id: '',
        name: '',
        enabled: true,
        ai_model: 'deepseek',
        exchange: 'hyperliquid',
        hyperliquid_private_key: '',
        hyperliquid_wallet_addr: '',
        hyperliquid_testnet: false,
        binance_api_key: '',
        binance_secret_key: '',
        deepseek_key: '',
        qwen_key: '',
        custom_api_url: '',
        custom_api_key: '',
        custom_model_name: '',
        initial_balance: 50,
        scan_interval_minutes: 3,
      });
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || t('addTraderError', language),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="binance-card p-6 animate-scale-in">
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2" style={{ color: '#EAECEF' }}>
          <span className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #F0B90B 0%, #FCD535 100%)' }}>
            ⚙️
          </span>
          {t('traderManagement', language)}
        </h2>
        <p className="text-sm" style={{ color: '#848E9C' }}>
          {t('addNewTrader', language)}
        </p>
      </div>

      {/* Message */}
      {message && (
        <div
          className="rounded p-4 animate-fade-in"
          style={
            message.type === 'success'
              ? { background: 'rgba(14, 203, 129, 0.1)', border: '1px solid rgba(14, 203, 129, 0.2)', color: '#0ECB81' }
              : { background: 'rgba(246, 70, 93, 0.1)', border: '1px solid rgba(246, 70, 93, 0.2)', color: '#F6465D' }
          }
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">{message.type === 'success' ? '✅' : '❌'}</span>
            <div className="flex-1">
              <p className="font-semibold mb-1">{message.type === 'success' ? t('success', language) : t('error', language)}</p>
              <p className="text-sm">{message.text}</p>
              {message.type === 'success' && (
                <p className="text-xs mt-2" style={{ color: '#848E9C' }}>
                  {t('redeployRequired', language)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="binance-card p-6 space-y-6">
        {/* Basic Info */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: '#EAECEF' }}>
            {t('basicInfo', language)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#848E9C' }}>
                {t('traderId', language)} *
              </label>
              <input
                type="text"
                required
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full px-4 py-2 rounded text-sm"
                style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
                placeholder="e.g., hyperliquid_deepseek_2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#848E9C' }}>
                {t('traderName', language)} *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded text-sm"
                style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
                placeholder="e.g., Hyperliquid DeepSeek Trader #2"
              />
            </div>
          </div>
        </div>

        {/* AI Configuration */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: '#EAECEF' }}>
            {t('aiConfiguration', language)}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#848E9C' }}>
                {t('aiModel', language)} *
              </label>
              <select
                value={formData.ai_model}
                onChange={(e) => setFormData({ ...formData, ai_model: e.target.value })}
                className="w-full px-4 py-2 rounded text-sm"
                style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
              >
                <option value="deepseek">DeepSeek</option>
                <option value="qwen">Qwen</option>
                <option value="custom">Custom API</option>
              </select>
            </div>

            {formData.ai_model === 'deepseek' && (
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#848E9C' }}>
                  DeepSeek API Key *
                </label>
                <input
                  type="password"
                  required
                  value={formData.deepseek_key}
                  onChange={(e) => setFormData({ ...formData, deepseek_key: e.target.value })}
                  className="w-full px-4 py-2 rounded text-sm font-mono"
                  style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
                  placeholder="sk-..."
                />
              </div>
            )}

            {formData.ai_model === 'qwen' && (
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#848E9C' }}>
                  Qwen API Key *
                </label>
                <input
                  type="password"
                  required
                  value={formData.qwen_key}
                  onChange={(e) => setFormData({ ...formData, qwen_key: e.target.value })}
                  className="w-full px-4 py-2 rounded text-sm font-mono"
                  style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
                  placeholder="sk-..."
                />
              </div>
            )}

            {formData.ai_model === 'custom' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#848E9C' }}>
                    Custom API URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.custom_api_url}
                    onChange={(e) => setFormData({ ...formData, custom_api_url: e.target.value })}
                    className="w-full px-4 py-2 rounded text-sm font-mono"
                    style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#848E9C' }}>
                    Custom API Key *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.custom_api_key}
                    onChange={(e) => setFormData({ ...formData, custom_api_key: e.target.value })}
                    className="w-full px-4 py-2 rounded text-sm font-mono"
                    style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
                    placeholder="sk-..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#848E9C' }}>
                    Model Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.custom_model_name}
                    onChange={(e) => setFormData({ ...formData, custom_model_name: e.target.value })}
                    className="w-full px-4 py-2 rounded text-sm"
                    style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
                    placeholder="gpt-4"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Exchange Configuration */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: '#EAECEF' }}>
            {t('exchangeConfiguration', language)}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#848E9C' }}>
                {t('exchange', language)} *
              </label>
              <select
                value={formData.exchange}
                onChange={(e) => setFormData({ ...formData, exchange: e.target.value })}
                className="w-full px-4 py-2 rounded text-sm"
                style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
              >
                <option value="hyperliquid">Hyperliquid</option>
                <option value="binance">Binance</option>
              </select>
            </div>

            {formData.exchange === 'hyperliquid' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#848E9C' }}>
                    {t('privateKey', language)} *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.hyperliquid_private_key}
                    onChange={(e) => setFormData({ ...formData, hyperliquid_private_key: e.target.value })}
                    className="w-full px-4 py-2 rounded text-sm font-mono"
                    style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
                    placeholder="0x..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#848E9C' }}>
                    {t('walletAddress', language)} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hyperliquid_wallet_addr}
                    onChange={(e) => setFormData({ ...formData, hyperliquid_wallet_addr: e.target.value })}
                    className="w-full px-4 py-2 rounded text-sm font-mono"
                    style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
                    placeholder="0x..."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="testnet"
                    checked={formData.hyperliquid_testnet}
                    onChange={(e) => setFormData({ ...formData, hyperliquid_testnet: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="testnet" className="text-sm" style={{ color: '#848E9C' }}>
                    {t('useTestnet', language)}
                  </label>
                </div>
              </div>
            )}

            {formData.exchange === 'binance' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#848E9C' }}>
                    Binance API Key *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.binance_api_key}
                    onChange={(e) => setFormData({ ...formData, binance_api_key: e.target.value })}
                    className="w-full px-4 py-2 rounded text-sm font-mono"
                    style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
                    placeholder="..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#848E9C' }}>
                    Binance Secret Key *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.binance_secret_key}
                    onChange={(e) => setFormData({ ...formData, binance_secret_key: e.target.value })}
                    className="w-full px-4 py-2 rounded text-sm font-mono"
                    style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
                    placeholder="..."
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trading Parameters */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: '#EAECEF' }}>
            {t('tradingParameters', language)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#848E9C' }}>
                {t('initialBalance', language)} (USDT) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.initial_balance}
                onChange={(e) => setFormData({ ...formData, initial_balance: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 rounded text-sm"
                style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#848E9C' }}>
                {t('scanInterval', language)} ({t('minutes', language)}) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.scan_interval_minutes}
                onChange={(e) => setFormData({ ...formData, scan_interval_minutes: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded text-sm"
                style={{ background: '#1E2329', border: '1px solid #2B3139', color: '#EAECEF' }}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-4 border-t" style={{ borderColor: '#2B3139' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: isSubmitting ? '#848E9C' : 'linear-gradient(135deg, #F0B90B 0%, #FCD535 100%)',
              color: '#000',
            }}
          >
            {isSubmitting ? t('submitting', language) : t('addTrader', language)}
          </button>
        </div>
      </form>
    </div>
  );
}
