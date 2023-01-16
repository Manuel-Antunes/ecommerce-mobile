#pragma once

#include "winrt/Microsoft.ReactNative.h"

namespace winrt::ivoucher_final_mobile::implementation
{
    struct ReactPackageProvider : winrt::implements<ReactPackageProvider, winrt::Microsoft::ReactNative::IReactPackageProvider>
    {
    public: // IReactPackageProvider
        void CreatePackage(winrt::Microsoft::ReactNative::IReactPackageBuilder const &packageBuilder) noexcept;
    };
} // namespace winrt::ivoucher_final_mobile::implementation

