import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';

// Компонент модального окна с формой заявки
export function Modal({ isOpen, onClose }) {
    const { t, language } = useLanguage();
    const [requestType, setRequestType] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        type: '',
        // Rent GPU
        targetGpuModel: '',
        gpuCount: '',
        minVram: '',
        expectedUptime: '',
        // Rent Out GPU
        gpuModel: '',
        gpuCountOut: '',
        totalVram: '',
        availableUptime: '',
        // LLM for business
        modelTypeBusiness: '',
        modelNameBusiness: '',
        modelUrl: '',
        avgInputTokens: '',
        avgOutputTokens: '',
        // Agent Placement
        agentDescription: '',
        // LLM for personal
        modelTypePersonal: '',
        modelNamePersonal: ''
    });

    const dropdownRef = useRef(null);

    const requestTypes = [
        { value: 'rent-gpu', label: t('formTypeRentGpu') },
        { value: 'rent-out-gpu', label: t('formTypeRentOutGpu') },
        { value: 'agent-placement', label: t('formTypeAgentPlacement') },
        { value: 'llm-business', label: t('formTypeLlmBusiness') },
        { value: 'llm-personal', label: t('formTypeLlmPersonal') }
    ];

    useEffect(() => {
        if (!isOpen) {
            setRequestType('');
            setFormData({
                name: '',
                contact: '',
                type: '',
                targetGpuModel: '',
                gpuCount: '',
                minVram: '',
                expectedUptime: '',
                gpuModel: '',
                gpuCountOut: '',
                totalVram: '',
                availableUptime: '',
                modelTypeBusiness: '',
                modelNameBusiness: '',
                modelUrl: '',
                avgInputTokens: '',
                avgOutputTokens: '',
                agentDescription: '',
                modelTypePersonal: '',
                modelNamePersonal: ''
            });
            setIsDropdownOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleSelectType = (value, label) => {
        setRequestType(value);
        setFormData(prev => ({ ...prev, type: value }));
        setIsDropdownOpen(false);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.type) {
            const message = language === 'ru'
                ? 'Пожалуйста, выберите тип запроса'
                : 'Please select a request type';
            alert(message);
            return;
        }

        console.log('Form submitted:', formData);

        const message = language === 'ru'
            ? 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.'
            : 'Application submitted! We will contact you soon.';
        alert(message);

        onClose();
    };

    const selectedTypeLabel = requestType
        ? requestTypes.find(rt => rt.value === requestType)?.label
        : t('formTypeSelect');

    if (!isOpen) return null;

    return (
        <div id="modal" className="modal show" onClick={(e) => e.target.id === 'modal' && onClose()}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>×</span>
                <h2>{t('getAccess')}</h2>
                <form id="applicationForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder={t('formName')}
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder={t('formContact')}
                            value={formData.contact}
                            onChange={(e) => handleInputChange('contact', e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <div className="custom-select" ref={dropdownRef}>
                            <div
                                className={`select-selected ${requestType ? 'has-value' : ''}`}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <span>{selectedTypeLabel}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" className="select-arrow">
                                    <path fill="currentColor" d="M6 9L1 4h10z"/>
                                </svg>
                            </div>
                            {isDropdownOpen && (
                                <div className="select-items">
                                    {requestTypes.map((type) => (
                                        <div
                                            key={type.value}
                                            className={`select-option ${requestType === type.value ? 'selected' : ''}`}
                                            onClick={() => handleSelectType(type.value, type.label)}
                                        >
                                            {type.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Rent GPU fields */}
                    {requestType === 'rent-gpu' && (
                        <div className="request-fields">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t('formTargetGpuModel')}
                                    value={formData.targetGpuModel}
                                    onChange={(e) => handleInputChange('targetGpuModel', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t('formGpuCount')}
                                    value={formData.gpuCount}
                                    onChange={(e) => handleInputChange('gpuCount', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t('formMinVram')}
                                    value={formData.minVram}
                                    onChange={(e) => handleInputChange('minVram', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t('formExpectedUptime')}
                                    value={formData.expectedUptime}
                                    onChange={(e) => handleInputChange('expectedUptime', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Rent Out GPU fields */}
                    {requestType === 'rent-out-gpu' && (
                        <div className="request-fields">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t('formGpuModel')}
                                    value={formData.gpuModel}
                                    onChange={(e) => handleInputChange('gpuModel', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t('formGpuCountOut')}
                                    value={formData.gpuCountOut}
                                    onChange={(e) => handleInputChange('gpuCountOut', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t('formTotalVram')}
                                    value={formData.totalVram}
                                    onChange={(e) => handleInputChange('totalVram', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t('formAvailableUptime')}
                                    value={formData.availableUptime}
                                    onChange={(e) => handleInputChange('availableUptime', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* LLM for business fields */}
                    {requestType === 'llm-business' && (
                        <div className="request-fields">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t('formModelType')}
                                    value={formData.modelTypeBusiness}
                                    onChange={(e) => handleInputChange('modelTypeBusiness', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t('formModelName')}
                                    value={formData.modelNameBusiness}
                                    onChange={(e) => handleInputChange('modelNameBusiness', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t('formModelUrl')}
                                    value={formData.modelUrl}
                                    onChange={(e) => handleInputChange('modelUrl', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t('formAvgInputTokens')}
                                    value={formData.avgInputTokens}
                                    onChange={(e) => handleInputChange('avgInputTokens', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t('formAvgOutputTokens')}
                                    value={formData.avgOutputTokens}
                                    onChange={(e) => handleInputChange('avgOutputTokens', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Agent Placement fields */}
                    {requestType === 'agent-placement' && (
                        <div className="request-fields">
                            <div className="form-group">
                                <textarea
                                    placeholder={t('formAgentDescription')}
                                    value={formData.agentDescription}
                                    onChange={(e) => handleInputChange('agentDescription', e.target.value)}
                                    rows="4"
                                />
                            </div>
                        </div>
                    )}

                    {/* LLM for personal use fields */}
                    {requestType === 'llm-personal' && (
                        <div className="request-fields">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t('formModelType')}
                                    value={formData.modelTypePersonal}
                                    onChange={(e) => handleInputChange('modelTypePersonal', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={t('formModelName')}
                                    value={formData.modelNamePersonal}
                                    onChange={(e) => handleInputChange('modelNamePersonal', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    <button type="submit" className="submit-button">
                        {t('getAccess')}
                    </button>
                </form>
            </div>
        </div>
    );
}




